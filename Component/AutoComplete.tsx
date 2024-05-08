import React, { ReactElement, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    View,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Keyboard,
    Platform
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    label: string;
    data: Array<{ label: string; value: string }>;
    onSelect: (item: { label: string; value: string }) => void;
    onChangeText: (value: string) => void;
    
}



export default function AutoComplete({ label, data, onSelect, onChangeText }: Props) {
    const DropdownButton = useRef() as any;
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined) as any;
    const [dropdownTop, setDropdownTop] = useState(0);
    const inputRef = React.useRef() as any;
    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = (): void => {
        DropdownButton.current?.measure((_fx: number, _fy: number, _w: number, h: number, _px: number, py: number) => {
            setDropdownTop(py + 30);
        });
        setVisible(true);
    };

    const onItemPress = (item: any): void => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const RenderItem = ({ item }: any): ReactElement<any, any> => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <FontAwesome name='map-marker' style={{ fontSize: 18, color: "#b3b3b3f1", marginRight: 10 }} /><Text>{item.label}</Text>
        </TouchableOpacity>
    );

    const renderDropdown = (): ReactElement<any, any> => {
        return (
            <Modal  visible={(visible && dropdownTop) ? true : false} transparent focusable={false} animationType="none" onShow={() => inputRef.current?.focus()} >
                <Pressable
                    onPress={toggleDropdown}
                    style={styles.overlay}  >
                    <View  style={[styles.dropdown, { top: dropdownTop }]}>
                        <TextInput 
                        autoFocus={false}
                        ref={inputRef}
                        style={styles.searchInput} onChangeText={onChangeText} />
                        {/* <FlatList
                            keyboardDismissMode="none"
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        /> */}
                        <ScrollView style={{ maxHeight: 250 }}>
                            {data.map((item) => {
                                return (
                                    <RenderItem item={item} key={item.value} />
                                )
                            })}
                        </ScrollView>
                    </View >
                </Pressable>
            </Modal>
        );
    };

    return (
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >
            <FontAwesome name='map-marker' style={styles.iconLeft} />
            {renderDropdown()}
            <TextInput
                editable={false}
                pointerEvents='none'
                style={styles.buttonText} placeholder={selected?.label?.slice(0, 40) ?? label} />
            <FontAwesome style={styles.icon} name="chevron-down" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        height: 45,
        zIndex: 1,
        numberOfLines: 1,
        width: "100%",
        borderWidth: 1,
        borderColor: "#00000029"
    },
    buttonText: {
        flex: 1,
        textAlign: 'left',
    },
    icon: {
        marginRight: 10,
    },
    dropdown: {
        backgroundColor: '#fff',
        elevation: 3,
        width: '100%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        padding: 8
    },
    overlay: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 12
    },
    item: {
        
        paddingHorizontal: 10,
        paddingVertical: 14,
        flexDirection: "row"
    },
    searchInput: {
        padding: 10,
        borderWidth: 1,
       
        borderColor: "#b3b3b3f1"
    },
    iconLeft: { fontSize: 20, color: "#FACC14", marginHorizontal: 8 }
});
