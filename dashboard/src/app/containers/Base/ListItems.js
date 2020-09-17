import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillCar } from 'react-icons/ai'
import { SiMakerbot } from 'react-icons/si'

const items = [
  { rota: '/', icone: <i className="fas fa-users" />, titulo: 'Clientes' },
  { rota: '/carros', icone: <AiFillCar size={25} />, titulo: 'Carros' },
  { rota: '/marcas', icone: <SiMakerbot size={25} />, titulo: 'Marcas' }
]

const ListItems = ({ open, history }) => {
  const localAtual = history.location.pathname
  return (
    <div className="items-wrapper">
      {items.map((item, idx) => (
        <Link to={item.rota} key={idx}>
          <div className={`menu-item ${localAtual === item.rota ? 'menu-item-active' : ''} flex horizontal`}>
            <div className="flex-1 flex flex-center">{item.icone}</div>
            {open && (
              <div className="flex-2 flex flex-start">
                <span>{item.titulo}</span>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ListItems
