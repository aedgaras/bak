import { Box, Button, HStack, Spacer } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"

export const NavigationMenu = () => {
    return <Box>
        <HStack>
        <Button>Home</Button>
        <Spacer />
        <ColorModeSwitcher />
        </HStack>

    </Box>
}