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

    function handleCancelOrder() {
        setSelectedTable('')
    }

    function handleAddToCart(product: Product) {
        if (!selectedTable) {
            setIsTableModalVisible(true)
        }

        setCartItem((prevState) => {
            const itemIdex = prevState.findIndex(cartItem => cartItem.product._id === product._id);
            if (itemIdex < 0) {
                return prevState.concat({
                    quantity: 1,
                    product,
                })
            }

            const newCartItems = [...prevState];
            const item = newCartItems[itemIdex]

            newCartItems[itemIdex] = {
                ...item,
                quantity: item.quantity + 1
            }

            return newCartItems;
        })
    }

    function handlDecremetCarItem(product: Product) {
        setCartItem((prevState) => {
            const itemIdex = prevState.findIndex(cartItem => cartItem.product._id === product._id);
            const item = prevState[itemIdex];

            const newCartItems = [...prevState];
            if (item.quantity === 1) {
                newCartItems.splice(itemIdex, 1);

                return newCartItems;
            }

            newCartItems[itemIdex] = {
                ...item,
                quantity: item.quantity - 1
            }

            return newCartItems;
        })
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
                    <Cart onAdd={handleAddToCart} onDecremetCart={handlDecremetCarItem} cartItem={cartItem} />
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
