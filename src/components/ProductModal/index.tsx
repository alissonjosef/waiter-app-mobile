import { FlatList, Modal } from "react-native";
import { Product } from "../../types/Product";

import { Text } from "../Text";
import { Image, CloseButton, Header, ModalBody, IngredientsContainer, Ingredient, Footer, FooterContainer, PriceContainer } from "./styles";
import { Close } from "../Icons/Close";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
}

export function ProductModal({ visible, onClose, product }: ProductModalProps) {
  if (!product) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.0.118:3001/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight="600">{product.name} </Text>
          <Text color="#666" style={{ marginTop: 8 }}>{product.description} </Text>
        </Header>

        { product.ingredients.length > 0 && (
          <IngredientsContainer>
          <Text weight="600" color="#666">Ingredientes</Text>
          <FlatList
            style={{ marginTop: 16 }}
            data={product.ingredients}
            keyExtractor={ingredient => ingredient._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: ingredient }) => (
              <Ingredient>
                <Text>{ingredient.icon}</Text>
                <Text style={{ paddingLeft: 20 }} size={14} color="#666">{ingredient.name}</Text>
              </Ingredient>
            )}
          />
        </IngredientsContainer>
        )}
      </ModalBody>
      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">{formatCurrency(product.price)}</Text>
          </PriceContainer>

          <Button onPress={() => alert('Adicionar ao pedido')} label='Adicionar ao pedido' />
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
