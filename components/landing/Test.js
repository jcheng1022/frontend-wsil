// import styled from "@emotion/styled";
import {Text, Title} from "@mantine/core";

const Test = () => {
    return (
        <Title  ta="center" mt={100}>
            Welcome to{' '}
            <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                Mantine
            </Text>
        </Title>
    )
}

export default Test

// const idk = styled.div``
