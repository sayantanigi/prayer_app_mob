import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Pressable, Image, ImageBackground, Modal, KeyboardAvoidingView, ScrollView } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useSwipe } from "../../../../hooks/onSwipe";
import { Switch } from "../../../../Component/Switch";
import { BackgroundColor, Black, PrimaryColor, White } from "../../../../Constant/Color";
import { Alerm_1, Alerm_2, Alerm_3, Alerm_4, Alerm_5, Alerm_6 } from "../../../../Constant/Images";

export enum Modals {
    DateModal = "DateModal",
    TimeZoneModal = "TimeZoneModal",
    None = "none"
}

interface DateModal {
    open: boolean;
    handler: (value: Modals) => void;
    state: [string, React.Dispatch<React.SetStateAction<string>>]
}

interface TimeZoneModal {
    open: boolean;
    handler: (value: Modals) => void;
    state: [string, React.Dispatch<React.SetStateAction<string>>]
}

// Repeat Modal
export function DateModal(props: DateModal) {
    const datesformodal = ["Once", "Daily", "Mon to Sat", "Custom"];
    const [selectedData, setSelectedDate] = props.state;

    return (
        <Modal
            transparent
            animationType="slide"
            onRequestClose={() => props.handler(Modals.None)}
            visible={props.open}>
            <SafeAreaView style={styles.ModalContainer}>
                <KeyboardAvoidingView>
                    <View style={styles.ModalBack}>
                        {datesformodal.map((date, index) => {
                            if (date !== selectedData) {
                                return (
                                    <Pressable key={index} onPress={() => setSelectedDate(date)} style={styles.ModalBlock}>
                                        <Text style={styles.ModalText}>{date}</Text>
                                    </Pressable>
                                )
                            } else {
                                return (
                                    <Pressable key={index} onPress={() => setSelectedDate(date)} style={[styles.ModalBlock, styles.ActiveModalBlock]}>
                                        <Text style={[styles.ModalText, styles.ActiveModalText]}>{date}</Text>
                                        <Feather style={styles.ActiveModalIcon} name="check" size={20} color="#741623" />
                                        <View style={styles.ActiveModalBackground}></View>
                                    </Pressable>
                                )
                            }
                        })}
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    );
}
const dailyDates = [
    {
        label: "S",
        selected: true,
    },
    {
        label: "M",
        selected: true,
    },
    {
        label: "T",
        selected: true,
    },
    {
        label: "W",
        selected: true,
    },
    {
        label: "T",
        selected: true,
    },
    {
        label: "F",
        selected: true,
    },
    {
        label: "S",
        selected: true,
    }
]
const monTosat = [
    {
        label: "S",
        selected: false,
    },
    {
        label: "M",
        selected: true,
    },
    {
        label: "T",
        selected: true,
    },
    {
        label: "W",
        selected: true,
    },
    {
        label: "T",
        selected: true,
    },
    {
        label: "F",
        selected: true,
    },
    {
        label: "S",
        selected: true,
    }
]

// Time Zone Modal
export function TimeZoneModal(props: TimeZoneModal) {
    const timeformodal = [
        "SST",
        "Asia/Delhi",
        "Asia/Dhaka",
        "Asia/Tokyo",
        "Japan",
        "Singapore",
        "Pacific/Truk"
    ];
    const [selectedTime, setSelectedTime] = props.state;

    return (
        <Modal
            transparent
            animationType="slide"
            onRequestClose={() => props.handler(Modals.None)}
            visible={props.open}>
            <SafeAreaView style={styles.ModalContainer}>
                <KeyboardAvoidingView>
                    <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={[styles.ModalBack, styles.TimeZoneModal]}>
                        {timeformodal.map((time, index) => {
                            if (time !== selectedTime) {
                                return (
                                    <Pressable key={index} onPress={() => setSelectedTime(time)} style={styles.ModalBlock}>
                                        <Text style={styles.ModalText}>{time}</Text>
                                    </Pressable>
                                )
                            } else {
                                return (
                                    <Pressable key={index} onPress={() => setSelectedTime(time)} style={[styles.ModalBlock, styles.ActiveModalBlock]}>
                                        <Text style={[styles.ModalText, styles.ActiveModalText]}>{time}</Text>
                                        <Feather style={styles.ActiveModalIcon} name="check" size={20} color="#741623" />
                                        <View style={styles.ActiveModalBackground}></View>
                                    </Pressable>
                                )
                            }
                        })}
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    );
}

// Timer Body
export default function U_AlarmScreen() {
    const navigation = useNavigation<any>();
    const [shouldShow, setShouldShow] = useState(true);
    const [hourCount, setHour] = useState(24);
    const [modal, setModal] = React.useState<Modals>(Modals.None);
    const modalDateState = useState("Daily");
    const modalTimeState = useState("Asia/Delhi");
    const { onTouchStart, onTouchEnd } = useSwipe(handleBottomSwipe)
    const [clockdate, setClockdate] = useState([
        {
            label: "S",
            selected: true,
        },
        {
            label: "M",
            selected: true,
        },
        {
            label: "T",
            selected: true,
        },
        {
            label: "W",
            selected: true,
        },
        {
            label: "T",
            selected: true,
        },
        {
            label: "F",
            selected: true,
        },
        {
            label: "S",
            selected: true,
        }
    ]);

    function handleSelection(index: number) {
        clockdate[index].selected = !clockdate[index].selected;
        setClockdate([...clockdate])
        let isAllSelected = clockdate.every((item) => item.selected);
        if (isAllSelected) {
            modalDateState[1]("Daily")
        }
        else {
            modalDateState[1]("Custom")
        }
    }
    useEffect(() => {
        let date = modalDateState[0];
        if (date === "Daily") {
            setClockdate(dailyDates)
        }
        else if (date === "Mon to Sat") {
            setClockdate(monTosat)
        }
        else if (date === "Once") {
            let today = new Date().getDay()
            let dailyDateCustom = dailyDates.map((_date, index) => {
                let date = { ..._date }
                date.selected = false
                if (index == today) {
                    date.selected = true
                }
                return date
            })
            setClockdate(dailyDateCustom)
        }
    }, [modalDateState[0]])

    // Prayer Timer Coundown
    useEffect(() => {
        let interval = setInterval(() => {
            setHour(lastHourCount => {
                if (lastHourCount == 0) {
                    navigation.navigate("")
                    return 0;
                } else {

                    return lastHourCount - 1
                }
            })
        }, 60 * 1000)
        return () => clearInterval(interval)
    }, []);

    // Gesture Handle
    function handleBottomSwipe() {
        navigation.goBack();
    }

    return (
        <ImageBackground style={styles.Container} source={Alerm_1}>
            {shouldShow ? (
                <>
                    <SafeAreaView style={styles.Container}>
                        {/* Drag to close section */}
                        <View style={styles.DragContainer}>
                            <View style={styles.DragBar}></View>
                        </View>

                        {/* Prayer time remaining */}
                        <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={styles.TimerTopBlock}>
                            <Text style={styles.TimerText}>PRAYER START AFTER</Text>
                            <Text style={styles.TimerCountdown}>{hourCount} : 00</Text>
                        </View>

                        {/* Timer */}
                        <Pressable onTouchStart={e => e.stopPropagation()} style={styles.TimerDownBlock}>
                            <Text style={styles.TimerText}>SET TIME TO PRAY FOR 1:20 PM</Text>
                            {/* Clock Design */}
                            <View style={styles.ClockContainer}>
                                <View style={styles.ClockOuterCircle}>
                                    <View style={styles.ClockInnerCircle}>
                                        <Text style={styles.ClockText}>25:00</Text>
                                    </View>
                                </View>
                                <Image style={styles.ClockBackImage} source={Alerm_2} resizeMode="contain" />
                            </View>

                            {/* Bottom Part */}
                            {/* Date */}
                            <View style={styles.ClockDateContainer}>
                                {clockdate.map((date, index) => {
                                    if (date.selected) {
                                        return (
                                            <Pressable key={index} onPress={() => handleSelection(index)} style={styles.ClockDateClick}>
                                                <Text style={styles.ClockDateText}>{date.label}</Text>
                                                <Image style={styles.ClockDateBlock} source={Alerm_3} />
                                            </Pressable>
                                        )
                                    }
                                    else {
                                        return (
                                            <Pressable key={index} onPress={() => handleSelection(index)} style={styles.ClockDateClick}>
                                                <Text style={styles.ClockDateText}>{date.label}</Text>
                                                <Image style={styles.ClockDateBlock} source={Alerm_4} />
                                            </Pressable>
                                        )
                                    }
                                })}
                            </View>

                            {/* Controller */}
                            <View style={styles.ControllerBlock}>
                                <Text style={styles.TimerText}>Repeat</Text>
                                <Pressable style={styles.ControllerLink} onPress={() => setModal(Modals.DateModal)}>
                                    <Text style={styles.ControllerTextOption}>{modalDateState[0]} <SimpleLineIcons name="arrow-right" size={16} color="white" /></Text>
                                </Pressable>
                            </View>
                            <View style={styles.ControllerBlock}>
                                <Text style={styles.TimerText}>Select Time Zone</Text>
                                <Pressable style={styles.ControllerLink} onPress={() => setModal(Modals.TimeZoneModal)}>
                                    <Text style={styles.ControllerTextOption}>{modalTimeState[0]} <SimpleLineIcons name="arrow-right" size={16} color="white" /></Text>
                                </Pressable>
                            </View>
                            <View style={styles.ControllerBlock}>
                                <Text style={styles.TimerText}>Vibrate when alarm sounds</Text>
                                <Switch />
                            </View>
                            <Pressable style={styles.TimerOffBtn} onPress={() => setShouldShow(!shouldShow)}>
                                <Image style={styles.TimerOffBtnImg} source={Alerm_5} />
                            </Pressable>
                        </Pressable>

                        {/* Modals */}
                        <DateModal state={modalDateState} open={modal == Modals.DateModal} handler={setModal} />
                        <TimeZoneModal state={modalTimeState} open={modal == Modals.TimeZoneModal} handler={setModal} />
                    </SafeAreaView>
                </>
            ) : (
                <SafeAreaView style={styles.Container}>
                    {/* Drag to close section */}
                    <View style={styles.DragContainer}>
                        <View style={styles.DragBar}></View>
                    </View>

                    {/* Prayer time remaining */}
                    <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={styles.TimerTopBlock}>
                        <Text style={styles.TimerText}>PRAYER START AFTER</Text>
                        <Text style={styles.TimerCountdown}>{hourCount} : 00</Text>
                    </View>

                    {/* Timer */}
                    <Pressable onTouchStart={e => e.stopPropagation()} style={styles.TimerDownBlock}>
                        <Text style={styles.TimerText}>SET TIME TO PRAY FOR 1:20 PM</Text>
                        {/* Clock Design */}
                        <View style={styles.ClockContainer}>
                            <View style={styles.ClockOuterCircle}>
                                <View style={styles.ClockInnerCircle}>
                                    <Text style={styles.ClockText}>25:00</Text>
                                </View>
                            </View>
                            <Image style={styles.ClockBackImage} source={Alerm_2} resizeMode="contain" />
                        </View>

                        {/* Bottom Part */}
                        {/* Date */}
                        <View style={styles.ClockDateContainer}>
                            {clockdate.map((date, index) => {
                                if (date.selected) {
                                    return (
                                        <Pressable key={index} onPress={() => handleSelection(index)} style={styles.ClockDateClick}>
                                            <Text style={styles.ClockDateText}>{date.label}</Text>
                                            <Image style={styles.ClockDateBlock} source={Alerm_3} />
                                        </Pressable>
                                    )
                                }
                                else {
                                    return (
                                        <Pressable key={index} onPress={() => handleSelection(index)} style={styles.ClockDateClick}>
                                            <Text style={styles.ClockDateText}>{date.label}</Text>
                                            <Image style={styles.ClockDateBlock} source={Alerm_4} />
                                        </Pressable>
                                    )
                                }
                            })}
                        </View>

                        {/* Controller */}
                        <View style={styles.ControllerBlock}>
                            <Text style={styles.TimerText}>Repeat</Text>
                            <Pressable style={styles.ControllerLink} onPress={() => setModal(Modals.DateModal)}>
                                <Text style={styles.ControllerTextOption}>{modalDateState[0]} <SimpleLineIcons name="arrow-right" size={16} color="white" /></Text>
                            </Pressable>
                        </View>
                        <View style={styles.ControllerBlock}>
                            <Text style={styles.TimerText}>Select Time Zone</Text>
                            <Pressable style={styles.ControllerLink} onPress={() => setModal(Modals.TimeZoneModal)}>
                                <Text style={styles.ControllerTextOption}>{modalTimeState[0]} <SimpleLineIcons name="arrow-right" size={16} color="white" /></Text>
                            </Pressable>
                        </View>
                        <View style={styles.ControllerBlock}>
                            <Text style={styles.TimerText}>Vibrate when alarm sounds</Text>
                            <Switch />
                        </View>
                        <Pressable style={styles.TimerOffBtn}>
                            <Pressable style={styles.TimerOffBtnCover} onPress={() => setShouldShow(!shouldShow)}></Pressable>
                            <Image style={styles.TimerOffBtnImg} source={Alerm_6} />
                        </Pressable>

                        {/* Timer Off Cover */}
                        <View style={styles.TimerOffBackCover}></View>
                    </Pressable>

                    {/* Modals */}
                    <DateModal state={modalDateState} open={modal == Modals.DateModal} handler={setModal} />
                    <TimeZoneModal state={modalTimeState} open={modal == Modals.TimeZoneModal} handler={setModal} />
                </SafeAreaView>
            )}
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    TimerOffBackCover: {
        backgroundColor: Black,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        opacity: .7,
    },
    TimerOffBtnCover: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 60,
        height: 60,
        alignSelf: "center",
        borderRadius: 100,
        zIndex: 3,
    },

    // Drag Design
    DragContainer: {
        height: "3%",
        justifyContent: "center",
        alignItems: "center",
    },
    DragBar: {
        width: 50,
        height: 4,
        borderRadius: 50,
        backgroundColor: White,
        opacity: 0.7,
    },
    TimerTopBlock: {
        height: "16%",
        paddingTop: 10,
    },
    TimerText: {
        fontFamily: "Inter-Regular",
        fontSize: 20,
        color: White,
        alignSelf: "center",
    },
    TimerCountdown: {
        fontFamily: "Inter-Bold",
        fontSize: 60,
        color: White,
        alignSelf: "center",
        lineHeight: 1.3 * 60
    },
    TimerDownBlock: {
        height: "81%",
        paddingTop: 15,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        position: "relative",
        zIndex: 0,
        backgroundColor: PrimaryColor,
    },

    // Clock Design
    ClockContainer: {
        alignSelf: "center",
        position: "relative",
        marginTop: 20,
        marginBottom: 20,
    },
    ClockBackImage: {
        width: 240,
        height: 240,
    },
    ClockOuterCircle: {
        position: "absolute",
        width: 220,
        height: 220,
        backgroundColor: "#D5D6DE",
        borderRadius: 1000,
        top: 10,
        zIndex: 1,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    ClockInnerCircle: {
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 150,
        borderRadius: 1000,
        backgroundColor: White,
    },
    ClockText: {
        fontFamily: "Inter-SemiBold",
        fontSize: 22,
    },

    // Date
    ClockDateContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingLeft: 10,
        paddingRight: 10,
    },
    ClockDateClick: {
        position: "relative",
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    ClockDateText: {
        position: "absolute",
        zIndex: 1,
        fontFamily: "Inter-SemiBold",
        color: White,
        fontSize: 16
    },
    ClockDateBlock: {
        width: 40,
        height: 40,
    },

    // Controller
    ControllerBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 25,
        alignItems: "center",
    },
    ControllerLink: {
        alignItems: "center",
        justifyContent: "center",
    },
    ControllerTextOption: {
        fontFamily: "Inter-Regular",
        fontSize: 20,
        color: White,
        alignSelf: "center",
        opacity: .5,
    },
    TimerOffBtn: {
        marginTop: 30,
        position: "relative",
        zIndex: 2,
    },
    TimerOffBtnImg: {
        width: 60,
        height: 60,
        alignSelf: "center",
    },

    // DateModal
    ModalContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    ModalBack: {
        backgroundColor: BackgroundColor,
        height: "auto",
        margin: 10,
        paddingBottom: 40,
        paddingTop: 40,
    },
    ModalBlock: {
        paddingBottom: 16,
        paddingTop: 16,
        paddingLeft: 20,
        paddingRight: 20,
    },
    ModalText: {
        color: Black,
        fontFamily: "Inter-Medium",
        fontSize: 18,
    },
    ActiveModalBlock: {
        position: "relative",
        zIndex: 0,
        flexDirection: "row",
        alignItems: "center",
    },
    ActiveModalText: {
        fontFamily: "Inter-Medium",
        color: PrimaryColor,
        zIndex: 2,
    },
    ActiveModalBackground: {
        backgroundColor: PrimaryColor,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        opacity: 0.4,
    },
    ActiveModalIcon: {
        position: "absolute",
        right: 20,
        zIndex: 2,
    },

    // TimeZoneModal
    TimeZoneModal: {
        height: 310,
        paddingTop: 0,
        paddingBottom: 0,
    },

});
