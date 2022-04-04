import Link from 'next/link'
import Head from 'next/head'
import Meta from '../Components/meta'
// import Search from "../Components/search"
import Dadata from '../Components/dadata'
import Header from "../Components/header"
import Footer from "../Components/footer"

export default function Main() {
  return (
    <>
      <Meta
        title={`Реестр многоквартирных домов России на карте. Поиск многоквартирного дома по адресу `}
        descritoin={`Реестр мкд. Сведения о количестве квартир, техническом состоянии здания`}
        keywords={`многоквартирный дом, поиск квартиры на карте`}
      />
      <div className="first">
        <Header />
        <div className="content">
          <Dadata />
          <div className="pledge__content">
            <div className="pledge__single _show _check">
              <h1 className="pledge__title">Проверить собственника квартиры - узнать кто официальный владелец недвижимости</h1>
              <div className="pledge__desc">Для получения сведений о ФИО собственника квартиры закажите отчёт об основных характеристиках обёекта. Узнать собственников квартиры по официальным данным в течение 1-2 часов на сайте ReestrGov</div>
              <div className="pledge__form">
                <div className="pledge__form-block obj js__pledgeBlock_1 _show">
                  <div className="pledge__form-field">
                    <div className="pledge__form-field-iconsearch"></div>

                  </div>
                  <div className="pledge__form-examples"> Пример:&nbsp;&nbsp;<span className="a _blue _inner js__pledgeSearchExample">г Россошь, Пролетарская улица, д 117 кв.34</span>&nbsp;&nbsp;или&nbsp;&nbsp;<span className="a _blue _inner js__pledgeSearchExample">16:24:050802:1666</span>
                  </div>
                  <div className="pledge__form-object"></div>
                </div>
              </div>
            </div>
            <div className="pledge__instruction js__pledgeInstructionBlock">
              <div className="pledge__instruction-content">
                <h2 className="pledge__instruction-title">Как проверить собственника квартиры</h2>
                <div className="pledge__instruction-text"> Чтобы узнать ФИО собственника квартиры и другие важные аспекты относящиеся к объекту недвижимости, необходимо заказать отчёт об основных характеристиках объекта. </div>
                <div className="pledge__instruction-text"> Для получения отчёта необходимо знать полный адрес объекта или кадастровый номер: Заказать документ можно несколькими способами: <ul className="pledge__instruction-ul"><li>В любом МФЦ вашего города;</li><li>Онлайн на сайте Reestrgov.</li></ul> Данные о собственниках имеются только для объектов недвижимости, которые были приобретены с 1998 года.
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
