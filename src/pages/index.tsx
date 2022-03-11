import Head from 'next/head';
import {GetStaticProps} from 'next';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss'
import { stripe } from '../services/stripe';


//client-side
//server-side
//static site generation

interface HomeProps{
  product:{
    priceId:string;
    amount:number;
  }
}

export default function Home({product}:HomeProps) {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏Olá,  Seja bem-vindo</span>
          <h1>Novidades sobre o mundo do <span>React</span>.</h1>
          <p>
            Tenha acesso a todas as publicações <br/>
            <span>por {product.amount} mensais</span>
            <SubscribeButton/>
          </p>
        </section>
        <img src='/images/avatar.svg' alt='Girl coding'/>
      </main>
    </>
  )
}

export const getStaticProps:GetStaticProps = async()=>{
  const price= await stripe.prices.retrieve('price_1KZc4ICuD241lpaYc8ter6VC', {
    expand:['product']
  })
  
  const product={
    priceId:price.id,
    amount: 
      new Intl.NumberFormat('pt-br',{
      style:'currency',
      currency:'BRL'}).format(price.unit_amount / 100),
  }

  return{
    props:{
      product,
    },
    revalidate: 60 * 60 * 24,
  }
}