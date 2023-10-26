import './Landing.css'
import Navigation from '../Navigation'

export default function Landing(){
  return (
    <div className='landing-page'>
      <div className='nav'>
        {/* <Navigation /> */}
      </div>
      <div className='landing-container'>
        <img className='landing-image' src={"https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/product_hero_invest__91b9077cf4788b508a013b9dda8c3ffe4d4fff969655c212a0201c9533237d46.png"} />
        <h1>Placeholder Title Text</h1>
        <h2>More information</h2>
      </div>
    </div>
  )
}
