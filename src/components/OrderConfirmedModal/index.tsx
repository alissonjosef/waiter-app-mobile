import { Modal } from "react-native";
import { Text } from "../Text";
import { Container, OkButton } from "./style";
import { CheckCircle } from "../Icons/CheckCircle";
import { StatusBar } from "expo-status-bar";

interface OrderConfirmedModalProps {
    visibles: boolean;
    onOk: () => void;
}

export function OrderConfirmedModal({ visibles, onOk }: OrderConfirmedModalProps) {
    return (
        <Modal
            visible={visibles}
            animationType="fade"
        >

            <StatusBar style="light" />
            <Container>
                <CheckCircle />
                <Text color="#f0f0f0" weight="600" size={20} style={{ marginTop: 12 }}>Pedido confirmado</Text>
                <Text color="#f0f0f0" opacity={0.9} style={{ marginTop: 4 }}>O pedido já entrou na fila de produção!</Text>

                <OkButton onPress={onOk}>
                    <Text weight="600" color="#D73035">OK</Text>
                </OkButton>
            </Container>
        </Modal>
    )
}
