
import Meta from '../Components/meta'
// import Search from "../Components/search"
import Dadata from '../Components/dadata'
import Header from "../Components/header"
import Footer from "../Components/footer"

export default function Main() {

  const descriptionMkd = `Реестр мкд - это реестр многоквартирых домов Российской Федерации, которые введены в эксплуатацию. На данный момент реестр содержит более одного миллиона объектов.
  Воспользовавшись поисковой формой для поиска конкретного многоквартирного дома по адресу, можно получить информацию о дате постройки, количестве этажей, подъездов, жилых и нежилых помещениях, а так же увидеть расположение на карте.
  Кроме этого реестр содержит технические сведения, такие как: тип постройки, материал стен, информацию о водо и газоснабжении. Дополнительной информацией явлются сведения о наличие или отсутсвие детской площадки и парковки, почтовый индекс, ОКАТО и ОКТМО.`
  const descriptionMkd2 = `Свдения из реестра многоквартирных домов пригодятся соискателям при выборе квартиры, по каждой из которой можно получить исчерпывающие сведения: кадастровые данные и стоимость, рыночную оценку, а так же множество другой полезной информации.
  При выборе стоит обратить внимание на возраст и фактический износ здания, внесен ли многоквартирный дом в реестр ветхого жилья и признан ли дом аварийным.`
  const instructionText = `Информация, содержащаяся в реестре, является открытой общедоступной на территории РФ. Данные сведения могут понадобиться при выборе квартиры для покупки или аренды. Прежде чем сделать выбор, достаточно получить информацию о здании и социальной инфраструктуре`

  return (
    <>
      <Meta
        title={`Реестр многоквартирных домов России на карте. Поиск многоквартирного дома по адресу `}
        descritoin={`Реестр мкд. Сведения о количестве квартир, техническом состоянии здания`}
        keywords={`многоквартирный дом, поиск квартиры на карте`}
      />
      <div className="first">
        <Header />
          <div className="pledge pageArrest">
            <div className="content">
            <Dadata />
            <div className="pledge__main">
              <div className="pledge__content">
                <div className="pledge__single _show _check">
                  <h1 className="pledge__title">Реестр многоквартирных домов РФ</h1>
                  <div className="pledge__desc">
                    <p className="descrParagraph">{descriptionMkd}</p>
                    <p className="descrParagraph">{descriptionMkd2}</p>
                  </div>
                  <div className="pledge__form">
                    <div className="pledge__form-block obj js__pledgeBlock_1 _show">
                      <div className="pledge__form-field">
                        <div className="pledge__form-field-iconsearch"></div>
                      </div>
                      <div className="pledge__form-object"></div>
                    </div>
                  </div>
                </div>
                <div className="pledge__instruction js__pledgeInstructionBlock">
                  <div className="pledge__instruction-content">
                    <h2 className="pledge__instruction-title">Для чего нужен реестр многоквартирных домов</h2>
                    <div className="pledge__instruction-text">{instructionText}</div>
                  </div>
                </div>
              </div>
              <div className="pledge__sidebar">
                <div className="pledge__sidebar-wrapper">
                  <div className="pledge__sidebar-title">Статистика реестра:</div>
                  <div className="pledge__sidebar-statistic">
                    <div className="pledge__sidebar-statistic-prop">
                      <span>мкд:</span>
                      <span>1 204 658</span>
                    </div>
                    <div className="pledge__sidebar-statistic-prop">
                      <span>Квартир:</span>
                      <span>98 567 832</span>
                    </div>
                    <div className="pledge__sidebar-statistic-prop">
                      <span>Помещений:</span>
                      <span>36 034 456</span>
                    </div>
                  </div>
                  <div className="pledge__sidebar-nav">
                    <a className="" href="#">
                      <span>Проверка на арест</span>
                    </a>
                    <a className="" href="#">
                      <span>Проверка на обременение</span>
                    </a>
                    <a className="_active" href="#">
                      <span>Проверка собственника</span>
                    </a>
                    <a className="" href="#">
                      <span>Проверка зем. участка</span>
                    </a>
                    <a className="" href="#">
                      <span>Проверка кад. стоимости</span>
                    </a>
                    <a className="" href="#">
                      <span>Узнать кад. номер по адресу</span>
                    </a>
                  </div>
                  <div className="pledge__sidebar-confirmation">
                    <span>Единый Реестр МКД РФ</span>
                  </div>
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
