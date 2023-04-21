import { useState } from "react";
import { Modal, TouchableOpacity, Platform } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { ModalBody, Overley, Header, Form, Input } from "./styles";

interface TableModalPros {
    visable: boolean
    onClose: () => void
    onSave: (table: string) => void
}

export function TableModal({ visable, onClose, onSave }: TableModalPros) {
    const [table, setTable] = useState('')

    function salvatPedidos() {
        setTable('')
        onClose()
        onSave(table)
    }

    return (
        <Modal
            visible={visable}
            animationType='fade'
            transparent>
            <Overley behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
                <ModalBody>
                    <Header>
                        <Text weight="600">Informe a mesa</Text>

                        <TouchableOpacity onPress={onClose}>
                            <Close color="#666" />
                        </TouchableOpacity>
                    </Header>

                    <Form>
                        <Input
                            placeholder="Numero da mesa"
                            placeholderTextColor="#666"
                            keyboardType="number-pad"
                            onChangeText={setTable}
                        />

                        <Button onPress={salvatPedidos} label='Salvar' disabled={table.length === 0}/>
                    </Form>
                </ModalBody>
            </Overley>
        </Modal>
    )
}
