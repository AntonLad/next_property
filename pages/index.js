import Link from 'next/link'
import Head from 'next/head'
import Search from "../Components/search"
import Header from "../Components/header"
import Footer from "../Components/footer"
import ButtonMongo from '../Components/buttonMongo'

export default function Main() {
  return (
    <>
      <Head>
        <title>mkdfond.ru - информационный онлайн сервис публичных сведений из ФГИС ЕГРН | Проверка квартиры перед покупкой на юридическую чистоту онлайн по кадастровому номеру</title>
        <meta name="description" content="Проверка квартиры, участка, дома, недвижимости онлайн через ЕГРН и Росреестр по кадастровому номеру"/>
        <meta name="keywords" content="ЕГРН, проверка, росреестр, кадастровый номер"/>
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
                    онлайн, а так же историю перехода права собственности.
                  </div>
                  <div className="main__blockItem-red">98 567 832 объекта в реестре</div>
                  {/* <a href="/proverit-sobstvennika-kvartiry" className="a _blue main__blockItem-link">
                    Подробнее &gt;
                  </a> */}
                </div>
                <div className="main__blockItem">
                  <div className="main__blockItem-title">МКД</div>
                  <div className="main__blockItem-descr">
                    Реестр многоквартирных домов - подробная информация о жилых зданиях: год постройки,
                    техническое состояние, инфраструктура, сведения об управляющих компаниях
                  </div>
                  <div className="main__blockItem-red">1 204 658 объектов в реестре</div>
                  {/* <a href="/proverit-kvartiru-na-arest" className="a _blue main__blockItem-link">
                    Подробнее &gt;
                  </a> */}
                </div>
                <div className="main__blockItem">
                  <div className="main__blockItem-title">Проверка квартиры</div>
                  <div className="main__blockItem-descr">
                    Проверка квартир перед покупкой на наличие обременений, арестов, залогов, а так же
                    рыночная оценка квартиры.
                  </div>
                  <div className="main__blockItem-red"> 98 567 832 объекта в реестре</div>
                  {/* <a href="/proverka-na-zalog" className="a _blue main__blockItem-link">
                    Подробнее &gt;
                  </a> */}
                </div>
                <div className="main__blockItem">
                  <div className="main__blockItem-title">Капитальный ремонт</div>
                  <div className="main__blockItem-descr">
                    Реестр многоквартирных домов, внесенных в реестр программу капитального ремонта.
                    Даты запланированного ремонта, выполненные работы.
                  </div>
                  <div className="main__blockItem-red">654 337 объектов в реестре</div>
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
                    Реестр земельных участков, ижс, промышленных зон и земель с/х назначения.
                    Обременения на использование земельного участка или его части, аресты, залоги и ограничения.
                  </div>
                  <div className="main__blockItem-red">25 263 432 объекта в реестре</div>
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
                  <div className="main__blockItem-red">127 045 336 объектов в реестре</div>
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
          <div className="map">
            <div className="map__image"></div>
              <div className="map__wrapper flex-a container">
                <div className="map__contacts"><div className="map__contacts-title">Реестр управляющих компаний ЖКХ</div>
                  <div className="map__contacts-content flex-b">
                    <div className="map__contacts-column">
                      <div className="map__contacts-infoblock first">
                        <div className="desc">
                          <p>
                            Управляющая компания - это обязательно юридическое лицо, которое берет на себя бремя ответственности
                            по управлению многоквартирными домами, поддержанию санитарного и технического состояния общего
                            домового имущества в надлежащем состоянии, доставке коммунальных ресурсов до конкретного пользователя.
                          </p>
                          <p>
                            Реестр позволяет узнать, какая коммунальная управляющая компания обслуживает
                            многоквартирный дом и получить контакты: адрес, телефон, электронный почтовый ящик.
                            Кроме этого, с помощью данного сервиса возможно узнать сколько многоквартирных домов
                            числится на балансе той или иной управляющей компании ЖКХ.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="/" className="map__contacts-button flex-jc">Перейти в реестр жкх</a>
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
                      Выберите нужный вид отчета, воспользовавшись быстрым переходом или формой поиска объекта недвижимости.
                      Если объект недвижимости имеется в базе, сервис подскажет верный адрес и кадастровый номер объекта.
                      Выберите искомый объект и перейдите на страницу с информацией. Далее укажите Ваш почтовый ящик и перейдите к оплате.
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
                        Для оплаты услуги, выберите предпочитаемый способ оплаты, например с помощью карты.
                        Оплата произойдет через сервис Робокасса по защищенному протоколу.
                        Все платежи защищены от перехвата персональных данных и абсолютно защищены.
                        После оплаты на указанный почтовый ящик придет информационное письмо с номером заказа.
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
                      Как только заказ будет готов, сервис отправит электронный отчет о проверке недвижимости.
                      Для Вашего удобства очтет формируется в PDF формате, который сразу же готов к печати.
                      Рекомендуем перед оформлением заказа внимательно проверить почтовые реквизиты.
                      Если в почтовом ящике будет допущена ошибка, сервис не сможет доставить отчет.
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
        {/* <ButtonMongo /> */}
        <Footer />
      </div>
    </>
  )
}
