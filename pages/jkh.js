
import Meta from '../Components/meta'
import SeoMenu from '../Components/seoMenu'
import DadataCompany from '../Components/dadataCompany'
import Header from "../Components/header"
import Footer from "../Components/footer"

export default function Main() {

  const descriptionJkh = `Управляющая компания - это обязательно юридическое лицо, которое берет на себя бремя ответственности
  по управлению многоквартирными домами, поддержанию санитарного и технического состояния общего домового имущества в надлежащем состоянии, доставке коммунальных ресурсов до конкретного пользователя.`
  const descriptionJkh2 = `Реестр управляющих компаний ЖКХ содержит информационные сведения: адрес, телефон, почтовый ящик, а так же другие реквизиты, такие как: ОКТМО, ИНН, ОГРН итд. Кроме этого, сервис
  покажет, сколько многоквартирных домов числится на балансе той или иной управляющей компании.`
  const instructionText = `Информация, содержащаяся в реестре, является открытой и общедоступной на территории РФ. Данные сведения могут пригодиться при составления обращений, подачи заявления или жалоб`
  return (
    <>
      <Meta
        title={`Реестр управляющих компаний ЖКХ России. Поиск управляющей компании по ИНН, ОГРН или названию.`}
        descritoin={`Реестр ЖКХ управляющих компаний. Адрес, телефон, ОКАТО, ИНН, ОГРН.`}
        keywords={`ЖХК, управляющая компания, ИНН, ОГРН.`}
      />
      <div className="first">
        <Header />
          <div className="pledge pageArrest">
            <div className="content">
            <DadataCompany />
            <div className="pledge__main">
              <div className="pledge__content">
                <div className="pledge__single _show _check">
                  <h1 className="pledge__title">Реестр управляющих компаний ЖКХ</h1>
                  <div className="pledge__desc">
                    <p className="descrParagraph">{descriptionJkh}</p>
                    <p className="descrParagraph">{descriptionJkh2}</p>
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
                    <h2 className="pledge__instruction-title">Для чего нужен реестр управляющих компаний</h2>
                    <div className="pledge__instruction-text">{instructionText}</div>
                  </div>
                </div>
              </div>
              <SeoMenu />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
