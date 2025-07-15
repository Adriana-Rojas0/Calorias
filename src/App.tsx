import UseBalanceEnergetico from './hooks/UseBalanceEnergetico'
import Form from './components/Form'
import CaloriesDisplay from './components/CaloriesDisplay'
import ActivityList from './components/ActivityList'


export default function App() {
  const {balance, balances, setBalance, addBalance,  updateBalance, deleteBalance, caloriasConsumidas, caloriasQuemadas, caloriasNetas}= UseBalanceEnergetico()

  return (
    <>
    <header className="bg-black py-3">
      <div className='max-w-4xl mx-auto flex justify-between items-center'>
        <h1 className= "text-4xl text-center font-bold text-white"> CONTADOR DE CALORÍAS</h1>
        
        <button className="bg-black  text-white  hover:bg-orange-400 cursor-pointer  text-sm p-2 rounded m-2">
        <a href="/calorias">REINICIAR APP </a>
        </button>
      </div>
    </header>    
    <main>      
        <section className='bg-gray-200 py-10 px-5'>
          <div>
          <Form
          balance={balance} 
          addBalance={addBalance} 
          setBalance={setBalance} 
          />
          </div>
        </section>
      
        <section className='bg-black py-10 px-5'>
          <div className='max-w-4-l mx-auto'>
          <CaloriesDisplay  
          caloriasConsumidas={caloriasConsumidas} 
          caloriasQuemadas={caloriasQuemadas} 
          caloriasNetas={caloriasNetas}                  
          />        
          </div>
        </section>

        <section className='py-10 px-5'>
          <div className='max-w-4-l mx-auto'>
          <ActivityList
          balances={balances}
          onUpdate={updateBalance}
          onDelete={deleteBalance}
                    
          />
        
          </div>
        </section>
          
    </main>
      
    </>
  )
}


