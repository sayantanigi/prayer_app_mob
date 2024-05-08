import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { TextColor } from "../Constant/Color";
import { Icon_25, Icon_30, Icon_39, Icon_40 } from "../Constant/Images";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { routes } from "../Constant/URL";
import { getUser } from "../store/userAsync";
import { useUser } from "../store/user";

export enum AccordianMode {
  None,
  Share,
  Comment,
}
interface ICommonAccordian {
  children: React.ReactElement | React.ReactElement[];
  open: boolean;
}

interface IReply {
  id: string;
  fullname: string;
  profilePic: string;
  post_id: string;
  comment: string;
  commented_on: string;
}
export interface Comment {
  id: string;
  fullname: string;
  profilePic: string;
  post_id: string;
  comment: string;
  commented_on: string;
  comment_like: string;
  comment_dislike: string;
  comment_reply: string;
}
interface ICommentShareAccordion {
  counter?: Comment;
  setModalState?: (val: boolean) => void;
}
export function CommonAccordian(props: ICommonAccordian) {
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState<number>(0);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  React.useEffect(() => {
    if (!props.open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  }, [props.open]);

  return (
    <Animated.View style={[styles.BodyBackground, { height: bodyHeight }]}>
      <View
        style={styles.BodyContainer}
        onLayout={(event) =>
          setBodySectionHeight(event.nativeEvent.layout.height)
        }
      >
        {props.children}
      </View>
    </Animated.View>
  );
}
const CommentShareAccordion = ({
  setModalState,
  counter,
}: ICommentShareAccordion) => {
  const [accordianMode, setAccordianMode] = React.useState<AccordianMode>(
    AccordianMode.None
  );
  const [replies, setReplies] = useState<IReply[]>([]);
  const [user, setUser] = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    (async () => {
      let response1 = await fetch(`${routes.getCommentReply}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: counter?.id }),
      });
      let json1 = await response1.json();
      setReplies(json1.result);
    })();
  }, [counter?.id]);

  async function isLike(value: string, lslikestatus: string) {
    setUser(await getUser());

    let response = await fetch(`${routes.getaddLikeForEachComment}`, {
      method: "POST",
      body: JSON.stringify({
        user_id: user?.userId,
        comment_id: value,
        isliked: lslikestatus,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    if (json.result === "Liked") {
      setIsLiked(true);
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
    }
  }

  return (
    <>
      {/* Top Part */}
      <View style={styles.CommentIconBlock}>
        <Pressable
          style={styles.CommentIcon}
          onPress={() =>
            setAccordianMode(
              accordianMode == AccordianMode.Share
                ? AccordianMode.None
                : AccordianMode.Share
            )
          }
        >
          <Image
            style={styles.CommentIconImg}
            source={Icon_30}
            resizeMode="contain"
          />
          <Text>{counter?.comment_reply}</Text>
        </Pressable>
        <Pressable
          onPress={() => isLike(counter?.id ?? "", "1")}
          style={styles.CommentIcon}
        >
          <Image
            style={styles.CommentIconImg}
            source={Icon_39}
            resizeMode="contain"
          />
          <Text>{counter?.comment_like}</Text>
        </Pressable>
        <Pressable
          onPress={() => isLike(counter?.id ?? "", "0")}
          style={styles.CommentIcon}
        >
          <Image
            style={styles.CommentIconImg}
            source={Icon_40}
            resizeMode="contain"
          />
          <Text>{counter?.comment_dislike}</Text>
        </Pressable>
        <Pressable
          onPress={() => setModalState?.(true)}
          style={styles.CommentIcon}
        >
          <Image
            style={styles.CommentIconImg}
            source={Icon_25}
            resizeMode="contain"
          />
          <Text>Comment</Text>
        </Pressable>
      </View>

      {/* Data Part */}
      <CommonAccordian open={accordianMode === AccordianMode.Share}>
        {Array.isArray(replies) ? (
          replies.map((reply, Shareindex) => (
            <View key={Shareindex} style={styles.CommentBlock}>
              <View style={styles.CommentImage}>
                <Image
                  style={styles.CommentImg}
                  source={{ uri: reply?.profilePic ?? "" }}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.CommentDetails}>
                <View style={styles.CommentData}>
                  <Text style={styles.CommentName}>{reply.fullname}</Text>
                  <Text style={styles.CommentTime}>{reply.commented_on}</Text>
                </View>
                <View style={styles.CommentLine}>
                  <Text style={styles.CommentLineText}>{reply.comment}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text>No Comment Posted Yet!</Text>
        )}
      </CommonAccordian>
    </>
  );
};
export default CommentShareAccordion;

const styles = StyleSheet.create({
  // Share Top
  CommentIconBlock: {
    flexDirection: "row",
    gap: 20,
  },
  CommentIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    position: "relative",
  },
  CommentIconImg: {
    width: 15,
    height: 15,
  },

  // Share Body
  BodyBackground: {
    overflow: "hidden",
  },
  BodyContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    width: Dimensions.get("window").width - 40,
    paddingTop: 5,
  },

  // Comments
  CommentBlock: {
    flexDirection: "row",
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  CommentImage: {
    width: 50,
  },
  CommentImg: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  CommentDetails: {
    width: Dimensions.get("window").width - 150,
    marginLeft: 10,
    flexDirection: "column",
    gap: 10,
  },
  CommentData: {
    gap: 2,
  },
  CommentName: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
  },
  CommentTime: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: TextColor,
  },
  CommentLine: {},
  CommentLineText: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    lineHeight: 15 * 1.5,
  },
});
