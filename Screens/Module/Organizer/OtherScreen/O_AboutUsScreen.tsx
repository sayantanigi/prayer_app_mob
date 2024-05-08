import { useNavigation } from "@react-navigation/native";
import O_ScreenLayout from "../O_ScreenLayout";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { BlankImage } from "../../../../Constant/Images";

export default function O_AboutUsScreen() {
    const navigation = useNavigation<any>();

    return (
        <O_ScreenLayout
            HeaderHidden
            VideoHidden
            ProductBuyHidden
            ProductCartHidden
            ProductCheckoutHidden
            title="About Us"
            BannerHeading="About Us"
            BannerImage={BlankImage}
        >
            <View style={styles.Container}>
                <Text style={styles.Heading}>
                    Who are we?
                </Text>
                <Text style={styles.SubHeading}>
                    We are average people, fathers, mothers, young adults, and youth who have faith and believe in God, the name of Jesus.
                </Text>
                <Text style={styles.SubHeading}>
                    120 was established from Pslams 120:1
                </Text>
                <Text style={styles.SubHeading}>
                    I cried out to the Lord in my distress, and He answered me!
                </Text>
                <Text style={styles.Heading}>
                    Why 120? Great question!
                </Text>
                <Text style={styles.SubHeading}>
                    In 2008, during a low time in the lives of many, setting a time during the day to stop and pray was mentioned as an idea. It happened to be 1:20 pm at that time for no intentional reason 1:20 pm became the alarm set for that day. After the first alarm had went off the movement had begun. Within one week there were already 17 people stopping and praying as text and private messages went back-and-forth, "did you stop and pray?" People expressed that knowing others were praying at the same time was very inspiring. At that moment 120 army became a movement. Since then, 120 army has grown to over 7000 individuals, consisting of 17 countries across the globe. Over 14 years we have stopped and prayed almost consistently, daily, and as a result, our lives have been greatly enriched, our relationship with Jesus has blossomed even more. One-twenty army is just a name, but the idea of us meeting together and connecting over praise and worship to our Heavenly Father is something truly amazing.
                </Text>
                <Text style={styles.Heading}>
                    Movement
                </Text>
                <Text style={styles.SubHeading}>
                    120 Movement is a great way to stop and pray personally and with other people daily.
                </Text>
                <Text style={styles.SubHeading}>
                    So how do we connect? Set your device for 1:20pm 7 days a week.
                </Text>
                <Text style={styles.SubHeading}>
                    When your ringer goes off take a moment to pray with us as we pray with you daily.
                </Text>
                <Text style={styles.SubHeading}>
                    Challenge yourself to stop and pray with us for 30 days, our hopes are that you would continue to pray every day after as a lifestyle and your relationship would grow even stronger as the days go by.
                </Text>
                <Text style={styles.SubHeading}>
                    We all need prayer. Prayer is the greatest form of love we can offer.
                </Text>
                <Text style={styles.SubHeading}>
                    Psalms 120:1, I cried out to the LORD in my distress and he answered me.
                </Text>
                <Text style={styles.SubHeading}>
                    Connect with us daily at 1:20 pm / 120 army face book.
                </Text>
                <Image style={styles.Image} source={require("../../../../assets/Images/Images/AboutUs.png")} resizeMode="contain" />
                <Text style={styles.Heading}>
                    Our Mission
                </Text>
                <Text style={styles.SubHeading}>
                    ENGAGE THE BODY OF CHRIST DAILY.
                </Text>
                <Text style={styles.SubHeading}>
                    EMPOWER OUR YOUTH/YOUNG ADULTS.
                </Text>
                <Text style={styles.SubHeading}>
                    EQUIPT FAMILIES.
                </Text>
                <Text style={styles.SubHeading}>
                    ENGAGE OUR FRIENDS WITH OTHER LEADERSHIP.
                </Text>
                <Text style={styles.SubHeading}>
                    HELP AND SUPPORT OUR COMMUNITY, THROUGH PRAYER.
                </Text>
                <Text style={styles.SubHeading}>
                    FUNDRAISING FOR YOUTH EVENTS/NEEDS.
                </Text>
                <Text style={styles.SubHeading}>
                    ENGAGE WITH MINISTERYS AROUND THE GLOBE.
                </Text>
                <Text style={styles.SubHeading}>
                    In Ezekiel 22:30, God is searching for those who would stand in the gap, to pray for others. The invitation is for all Christians to serve through prayer. Praying for others is not a choice; it is our privilege. Whether we believe it or not, we are all equipped to pray on behalf of others. We are heirs with Christ. We are adopted sons and daughters and therefore possess the same power and access to God that our Savior enjoys. We can whisper, or cry out, and offer our requests to our Heavenly Father, and He hears us. Sharing in the inheritance of Jesus, we are called high priests with a direct connection to God and an opportunity to offer up prayers on behalf of family, friends, neighbors, government officials, and our nation. The words do not have to be perfect, only spoken through love and trust in a God who hears and answers.
                </Text>
            </View>
        </O_ScreenLayout>
    );
}

const styles = StyleSheet.create({
    Container: {
        padding: 20,
    },
    Heading: {
        fontFamily: "Inter-SemiBold",
        fontSize: 17,
        lineHeight: 17 * 1.5,
        paddingBottom: 10,
    },
    SubHeading: {
        fontFamily: "Inter-Regular",
        fontSize: 15,
        lineHeight: 15 * 1.5,
        paddingBottom: 10,
    },
    Image: {
        width: "100%",
        height: 300,
    }
})