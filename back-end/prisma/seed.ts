import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.donatory.createMany({
        data: [
            {
                name: 'Lois Lene',
                user_name: 'Lois',
                email: 'lois@email.com',
                password: '123456'
            },
            {
                name: 'Ana Julia',
                user_name: 'Ana',
                email: 'ana@email.com',
                password: '123456'
            },
            {
                name: 'Carminha Brasil',
                user_name: 'Carminha',
                email: 'carmina@email.com',
                password: '123456'
            },
            {
                name: 'Capitu Assis',
                user_name: 'Capitu',
                email: 'capitu@email.com',
                password: '123456'
            },
            {
                name: 'Diana Comics',
                user_name: 'Diana',
                email: 'diana@email.com',
                password: '123456'
            },
              {
                name: 'Hermione Granger',
                user_name: 'Mione',
                email: 'mione@email.com',
                password: '123456'
            }
        ]
    })
    const donatories = await prisma.donatory.findMany()

    await prisma.product.createMany({
        data: [
            {
                title: 'Absorvente com abas',
                description: 'Absorvente com abas seco para o dia a dia, pacote com 8 unidades.',
                unit_price: 15000,
                image: 'https://lh3.googleusercontent.com/pw/AJFCJaVZKCRK3Or74sHuOYq1KC7ZqasUBDbdAIYCWp9FNfZNF2mzHij_W0m3xJdbOjq7y2QM3D6k-N-MhK1um-_TxMYY8L-e6XaKrpbTY-l_B-fEgv9E1tp412DZdChvAiJGHrTXawLL98DFzXhl0K01OB4=w636-h636-s-no?authuser=0'
            },
            {
                title: 'Absorvente noturno',
                description: 'Absorvente com abas noturno, pacote com 8 unidades.',
                unit_price: 17000,
                image: 'https://lh3.googleusercontent.com/pw/AJFCJaVZKCRK3Or74sHuOYq1KC7ZqasUBDbdAIYCWp9FNfZNF2mzHij_W0m3xJdbOjq7y2QM3D6k-N-MhK1um-_TxMYY8L-e6XaKrpbTY-l_B-fEgv9E1tp412DZdChvAiJGHrTXawLL98DFzXhl0K01OB4=w636-h636-s-no?authuser=0'
            },
            {
                title: 'Absorvente suave',
                description: 'Absorvente com abas suave, pacote com 8 unidades.',
                unit_price: 15000,
                image: 'https://lh3.googleusercontent.com/pw/AJFCJaVZKCRK3Or74sHuOYq1KC7ZqasUBDbdAIYCWp9FNfZNF2mzHij_W0m3xJdbOjq7y2QM3D6k-N-MhK1um-_TxMYY8L-e6XaKrpbTY-l_B-fEgv9E1tp412DZdChvAiJGHrTXawLL98DFzXhl0K01OB4=w636-h636-s-no?authuser=0'
            }
        ]
    })
    const products = await prisma.product.findMany()

    await prisma.request.createMany({
        data: [
            {
                donatory_id: donatories[0].id,
                giver_id: null,
                total: 15000
            },
            {
                donatory_id: donatories[1].id,
                giver_id: null,
                total: 17000
            },
            {
                donatory_id: donatories[2].id,
                giver_id: null,
                total: 15000
            },
            {
                donatory_id: donatories[3].id,
                giver_id: null,
                total: 30000
            },
            {
                donatory_id: donatories[4].id,
                giver_id: null,
                total: 32000
            },
            {
                donatory_id: donatories[5].id,
                giver_id: null,
                total: 64000
            }
        ]
    })
    const requests = await prisma.request.findMany()

    await prisma.product_request.createMany({
        data: [
            {
                request_id: requests[0].id,
                product_id: products[0].id,
                quantity: 1,
                unit_price: 15000
            },
            {
                request_id: requests[1].id,
                product_id: products[1].id,
                quantity: 1,
                unit_price: 17000
            },
            {
                request_id: requests[2].id,
                product_id: products[2].id,
                quantity: 1,
                unit_price: 15000
            },
            {
                request_id: requests[3].id,
                product_id: products[0].id,
                quantity: 1,
                unit_price: 15000
            },
            {
                request_id: requests[3].id,
                product_id: products[2].id,
                quantity: 1,
                unit_price: 15000
            },
            {
                request_id: requests[4].id,
                product_id: products[0].id,
                quantity: 1,
                unit_price: 15000
            },
            {
                request_id: requests[4].id,
                product_id: products[1].id,
                quantity: 1,
                unit_price: 17000
            },
            {
                request_id: requests[5].id,
                product_id: products[0].id,
                quantity: 2,
                unit_price: 15000
            },
            {
                request_id: requests[5].id,
                product_id: products[1].id,
                quantity: 2,
                unit_price: 17000
            }
        ]
    })

}

main()
    .then((async () => {
        await prisma.$disconnect()
    }))
    .catch(
        async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        }
    )