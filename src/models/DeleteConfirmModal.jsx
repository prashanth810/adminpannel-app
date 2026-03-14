import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Loading from "../components/Loadeing";

const DeleteConfirmModal = ({ visible, onConfirm, onCancel, loader }) => {

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.backdrop}>
                <View style={styles.card}>

                    <Text style={styles.title}>Delete ?</Text>
                    <Text style={styles.subtitle}>
                        Are you sure you want to delete this?{"\n"}
                        <Text style={styles.warn}>You can't undo this action.</Text>
                    </Text>

                    {loader ? (
                        <Loading loader={loader} />
                    ) : (
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.deleteBtn} onPress={onConfirm}>
                                <Text style={styles.deleteText}>Yes, Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>
            </View>
        </Modal >
    );
};

export default DeleteConfirmModal;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1A1D23",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 24,
    },
    warn: {
        color: "#E53935",
        fontWeight: "600",
    },
    buttonRow: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#E2E8F0",
        alignItems: "center",
    },
    cancelText: {
        fontWeight: "600",
        color: "#64748B",
    },
    deleteBtn: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: 10,
        backgroundColor: "#E53935",
        alignItems: "center",
    },
    deleteText: {
        fontWeight: "700",
        color: "#fff",
    },
});