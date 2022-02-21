function addContent() {
  while (true) {
    let inputHtml = ` <div class="right-card">
                        <a class="link content-block"
                            href="https://национальныепроекты.рф/news/novyy-poryadok-okazaniya-medpomoshchi-pri-onkozabolevaniyakh-vstupit-v-silu-s-2022-goda?&utm_content=Autotargeting&utm_medium=CPC&utm_source=MRG_Pulse&&utm_referrer=https%3A%2F%2Fpulse.mail.ru&utm_campaign=zdravookhranenie">
                            <div class="content-block__image" style="
                    background-image: url(https://pulse.imgsmail.ru/imgpreview?key=pic535352879290866034&mb=pulse&crop=center&fu=1&h=208&w=388);
                  "></div>
                            <div class="content-block__wrapper">
                                <div class="content-block__header">
                                    Новый порядок оказания медпомощи при онкозаболеваниях
                                    вступит в силу с 2022 года
                                </div>
                            </div>
                        </a>
                        <div class="content-block-footer">
                            <a class="content-block-footer__resource-domain link"
                                href="https://pulse.mail.ru/source/6938800338737803133">новости.рф</a>

                            <div class="content-block-footer__reactions">
                                <span class="content-block-footer__reactions-wrapper">
                                    <svg class="content-block-footer__reactions-like-svg" fill="none" height="16"
                                        viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                        <use xlink:href="#like" />
                                    </svg>
                                    108</span>
                            </div>
                        </div>
                    </div>`;
    let windowRelativeBottom =
      document.documentElement.getBoundingClientRect().bottom;

    if (windowRelativeBottom > document.documentElement.clientHeight + 100)
      break;
    // добавим больше данных
    document
      .getElementsByClassName("main-content-grid")[0]
      .insertAdjacentHTML("beforeend", inputHtml);
  }
}

window.addEventListener("scroll", addContent);

addContent();
