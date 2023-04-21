import { useState } from "react";
import { Button } from "../components/Button";
import { Categories } from "../components/Categories/inidex";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu/inidex";
import { TableModal } from "../components/TableModal";
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";

export function Main() {

    const [isTableModalVisible, setIsTableModalVisible] = useState(false)
    const [selectedTable, setSelectedTable] = useState('')
    const [cartItem, setCartItem] = useState<CartItem[]>([

    ])

    function handleSabeTalbe(table: string) {
        setSelectedTable(table)
    }

    function handleCancelOrder(){
        setSelectedTable('')
    }

    function handleAddToCart(product: Product) {
        if(!selectedTable){
            setIsTableModalVisible(true)
        }
        alert(product.name)
    }

    return (
        <>
            <Container>
                <Header
                selectedTable={selectedTable}
                onCancelOrder={handleCancelOrder}
                />

                <CategoriesContainer>
                    <Categories></Categories>
                </CategoriesContainer>

                <MenuContainer>
                    <Menu onAddToCart={handleAddToCart} />
                </MenuContainer>

            </Container>
            <Footer>
                {!selectedTable && (

                    <FooterContainer>
                        <Button onPress={() => setIsTableModalVisible(true)} label="Novo Pedido" />
                    </FooterContainer>
                )}
            {selectedTable && (
                <Cart cartItem={cartItem}/>
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
