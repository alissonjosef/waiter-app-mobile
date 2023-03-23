import { useState } from "react";
import { Button } from "../components/Button";
import { Categories } from "../components/Categories/inidex";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu/inidex";
import { TableModal } from "../components/TableModal";
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";

export function Main() {

    const [isTableModalVisible, setIsTableModalVisible] = useState(false)
    const [selectedTable, setSelectedTable] = useState('')

    function handleSabeTalbe(table: string) {
        setSelectedTable(table)
    }

    return (
        <>
            <Container>
                <Header />

                <CategoriesContainer>
                    <Categories></Categories>
                </CategoriesContainer>

                <MenuContainer>
                    <Menu />
                </MenuContainer>

            </Container>
            <Footer>
                {!selectedTable && (

                    <FooterContainer>
                        <Button onPress={() => setIsTableModalVisible(true)} label="Novo Pedido" />
                    </FooterContainer>
                )}
            </Footer>

            <TableModal
                visable={isTableModalVisible}
                onClose={() => setIsTableModalVisible(false)}
                onSave={handleSabeTalbe}
            />
        </>
    );
}
