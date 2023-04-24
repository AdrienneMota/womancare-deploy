import styled from "styled-components"
import banner from "../assets/img/banner.png"
import Header from "../components/Header"
import Footer from "../components/Footer"
import TitleSession from "../components/TitleSession"

export default function Sobre(){
    return(
        <>
            <Header/>
            <Banner src={banner}/>
            <TitleSession>
                <p>A ideia</p>
                <div></div>
            </TitleSession>
            <Text>
                <p>Você sabia que existem mulheres que não conseguem comprar absorvente? Este grave   problema social é chamado de pobreza menstrual.Pensando em sugerir uma contribuição para melhorar esta realidade o womancare surgiu como a ideia de uma plataforma de doação de absorvente para mulheres em situação de vulnerabilidade social. </p> 
            </Text>
            <TitleSession>
                <p>Como funciona?</p>
                <div></div>
            </TitleSession>
            <Text>
                <p>A ideia é tornar possível que uma pessoa possa finalizar o pedido de compra de outra pessoa. Então, ao acessar a plataforma você terá acesso aos pedidos das beneciárias cadastradas, e após escolher qual pedido é o mais acessível a sua situação, você        poderá     pagá-lo. E pronto, você fez sua doação.
                </p>
            </Text>
            <TitleSession>
                <p>Conheça outras iniciativas</p>
                <div></div>
            </TitleSession>
            <Text>
                <p>A womancare é apenas uma ideia, porém a probreza menstrual é bastante real e caso você tenha interesse em conhecer iniciativas reais que atuam na solução deste problema aqui vai algumas sugestões: </p>
            </Text>
            <OthersProjects>
                <Project href='https://www.fluxosemtabu.com/'>Fluxo sem tabu</Project>
                <Project href='https://www.absorvendoamorsp.org/?gclid=Cj0KCQjwxYOiBhC9ARIsANiEIfZGYAf3BhxU3nJts3CKiIOeGmPauwcfdOcia_W5_k8yGIR4sPBSutwaAl1HEALw_wcB' >Absorvendo Amor</Project>
                <Project href='https://www.rebbu.org/amazonas' >Rebbú</Project>
            </OthersProjects>
            <Footer/>
        </>
    )
}

const Banner = styled.img`
  margin-top: 5.5rem;
  width: 100vw;
  margin-right: auto;
  margin-left: auto;
`
const Text = styled.div`
    margin-top: 1.5rem;
    width: 50vw;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    line-height: 2rem;
    font-size: 1rem;
`
const OthersProjects = styled.div`
    margin-top: 1.5rem;
    width: 60vw;
    height: 7rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 400px) {
        display: flex;
        flex-direction: column;
        text-align: center;
    }
`
const Project = styled.a`
    text-decoration: none;
    font-size: 1.5rem;
    font-size: 32px;
    font-family: 'Alkatra', cursive;;
    font-weight: bold;
    color: #543f7b;
    cursor: pointer;
    @media (max-width: 400px) {
        font-size: 25px;
    }
`