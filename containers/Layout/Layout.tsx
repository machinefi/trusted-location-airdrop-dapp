import { Container } from "@chakra-ui/react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { ReactNode } from "react"

export const Layout = ({children}:{children:ReactNode}) => {
    return (
        <Container>
            <Navbar />
            {children}
            <Footer />
        </Container>
    )
}