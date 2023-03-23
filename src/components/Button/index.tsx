import { Text } from "../Text";
import { Container } from "./styles";

interface ButtonProps {
    label: string;
    onPress: () => void;
    disabled?: boolean;
}

export function Button({ label, onPress, disabled }: ButtonProps) {

    return (
        <Container disabled={disabled} onPress={onPress}>
            <Text weight="600" color="#fff">{label}</Text>
        </Container>
    );
}