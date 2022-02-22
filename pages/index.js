import Link from 'next/link'
import Head from 'next/head'
import Search from "../Components/search"
import Header from "../Components/header"
import Footer from "../Components/footer"


export default function Main() {
  return (
    <>
      <Head>
        <title>Проверка квартиры перед покупкой на юридическую чистоту онлайн по кадастровому номеру | Проверить недвижимость онлайн по адресу</title>
        <meta name="description" content="Проверка квартиры, участка, дома, недвижимостионлайн через ЕГРН и Росреестр по кадастровому номеру"/>
        <meta name="keywords" content="ЕГРН, выписка из ЕГРН, проверка, росреестр, кадастровый номер"/>
      </Head>
      <div className="first">
        <Header />
        <div className="main">
          <div className="main__first">
            <div className="content">
              <div className="main__first-h1">
                Реестр сведений о недвижимости, ее кадастровой и рыночной стоимости
              </div>
              <h1 className="main-descr">
                Проверить квартиру перед покупкой на юридическую чистоту онлайн - на обременение,
                залог и арест
              </h1>
              <Search />
              <div className="main__first-info">
                <div className="main__first-infoItem">
                  <div className="main__first-infoItem-title">Проверка недвижимости</div>
                  <div className="main__first-infoItem-descr">
                    Данный сервис позволяет узнать максимум полезной и актуальной информации
                    о квартире, частном доме или участке: кадастровые сведения, техническую
                    информацию о МКД, рыночную стоимость объекта, а так же социальную инфраструктуру
                    вокруг объекта недвижимости. Для поиска информации, необходимо
                    ввести адрес или кадастровый номер объекта недвижимости. Сервис подскажет
                    объект с искомыми параметрами.
                  </div>
                </div>
                <div className="main__first-infoItem">
                  <div className="main__first-infoItem-title">Многоквартирные дома</div>
                  <div className="main__first-infoItem-descr">
                    Реестр МКД содержит справочные технические сведения о большинстве многоквартирных
                    домов РФ. Воспользовавшись реестром можно узнать год постройки, состояние здания,
                    наличие или отсутсвие водопровода, электричества, газа, а так же материалы из которых
                    возведен многоквартриный дом. Кроме этого, можно получить свадения о каждой квартире
                    многоквартирного дома и произвести ее оценку.
                  </div>
                </div>
                <div className="main__first-infoItem">
                  <div className="main__first-infoItem-title">Капитальный ремонт</div>
                  <div className="main__first-infoItem-descr">
                    Реестр капитального ремонта содержит сведения о многоквартирных домах, которые
                    включены в государственную программу капитального ремонта многоквартирных домов.
                    Воспользовавшись реестром можно узнать на какие года запланирован капитальный ремонт,
                    какие работы были произведены ранее, какие суммы были затрачены. Кроме этого, реестр
                    содержит сведения о подрядчиках, которые выполняли ремонтные работы.
                  </div>
                </div>
              </div>
              <div className="main__first-eagle" />
            </div>
          </div>
          <div className="main__blocks">
            <div className="content">
              <div className="main__blocks-wrap">
                <div className="main__blockItem">
                  <div className="main__blockItem-title">Проверка собственника</div>
                  <div className="main__blockItem-descr">
                    Проверить собственника квартиры по адресу - узнать ФИО владельца недвижимости
                    онлайн
                  </div>
                  <div className="main__blockItem-red">15 164 578 объектов в реестре</div>
                  {/* <a href="/proverit-sobstvennika-kvartiry" className="a _blue main__blockItem-link">
                    Подробнее &gt;
                  </a> */}
                </div>
                <div className="main__blockItem">
                  <div className="main__blockItem-title">МКД</div>
                  <div className="main__blockItem-descr">
                    Реестр многоквартирных домов - техническая информация и данные о капремонте
                  </div>
                  <div className="main__blockItem-red">11 477 301 объект(ов) в реестре</div>
                  {/* <a href="/proverit-kvartiru-na-arest" className="a _blue main__blockItem-link">
                    Подробнее &gt;
                  </a> */}
                </div>
                <div className="main__blockItem">
                  <div className="main__blockItem-title">Квартиры</div>
                  <div className="main__blockItem-descr">
                    Реестр квартир в МКД - сведения о рыночной стоимости и другие актуальные данные
                  </div>
                  <div className="main__blockItem-red"> 37 421 701 объект(ов) в реестре</div>
                  {/* <a href="/proverka-na-zalog" className="a _blue main__blockItem-link">
                    Подробнее &gt;
                  </a> */}
                </div>
                <div className="main__blockItem">
                  <div className="main__blockItem-title">Обременения</div>
                  <div className="main__blockItem-descr">
                    Обременения на использование земельного участка или его части, согласно проверке в
                    базе недвижимости
                  </div>
                  <div className="main__blockItem-red">164 578 объектов в реестре</div>
                  {/* <a
                    href="/proverit-kvartiru-na-obremenenie"
                    className="a _blue main__blockItem-link"
                  >
                    Подробнее &gt;
                  </a> */}
                </div>
                <div className="main__blockItem">
                  <div className="main__blockItem-title">Земельные участки</div>
                  <div className="main__blockItem-descr">
                    Реестр земельных участков, ижс, промышленных зон и земель с/х назначения
                  </div>
                  <div className="main__blockItem-red">4 263 432 объекта в реестре</div>
                  {/* <a
                    href="/proveit-kadastroviy-nomer-zemelnogo-uchastka"
                    className="a _blue main__blockItem-link"
                  >
                    Подробнее &gt;
                  </a> */}
                </div>
                <div className="main__blockItem">
                  <div className="main__blockItem-title">Кадастровая стоимость</div>
                  <div className="main__blockItem-descr">
                    В случае оспаривания стоимости объекта требуется справка о кадастровой стоимости
                    объекта
                  </div>
                  <div className="main__blockItem-red">15 621 137 объектов в реестре</div>
                  {/* <a
                    href="/uznat-kadastrovuyu-stoimost-obyekta-nedvizhimosti"
                    className="a _blue main__blockItem-link"
                  >
                    Подробнее &gt;
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="main__faq">
            <div className="content" itemScope="" itemType="http://schema.org/FAQPage">
              <div className="main__faq-title">Как работает сервис</div>
              <div className="main__faq-wrap">
                <div className="main__faqItem _open">
                  <div className="main__faqItem-descr">
                    <div className="faqTitle create">
                      Оформление заявки
                    </div>
                    <div className="faqText">
                      Выберите нужный вид выписки или воспользуйтесь формой поиска объекта недвижимости.
                      Сервис покажет Вам все найденные объекты недвижимости по вашему запросу.
                      Выберите нужный объект, проверьте правильность указанных данных,
                      укажите Ваш почтовый ящик и перейдите к оплате.
                    </div>
                  </div>
                </div>
                <div className="main__faqItem _open">
                  <div className="main__faqItem-descr">
                    <div className="faqTitle pay">
                      Оплата услуг
                    </div>
                    <div className="faqText">
                      <div>
                        Выберите нужный вид выписки или воспользуйтесь формой поиска объекта недвижимости.
                        Сервис покажет Вам все найденные объекты недвижимости по вашему запросу.
                        Выберите нужный объект, проверьте правильность указанных данных,
                        укажите Ваш почтовый ящик и перейдите к оплате.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main__faqItem _open">
                  <div className="main__faqItem-descr">
                    <div className="faqTitle send">
                      Получение заказа
                    </div>
                    <div className="faqText">
                      Выберите нужный вид выписки или воспользуйтесь формой поиска объекта недвижимости.
                      Сервис покажет Вам все найденные объекты недвижимости по вашему запросу.
                      Выберите нужный объект, проверьте правильность указанных данных,
                      укажите Ваш почтовый ящик и перейдите к оплате.
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
