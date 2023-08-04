import data from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'swiper-container slide-swiper overflow-hidden id1';

    let htmlData = [];
    for(let i = 0; i < data.slider.length; i++) {
        htmlData.push(
            `<a title="Slider" href="category" class="swiper-slide">
            <img src="${data.slider[i]}" alt="Category">
            </a>`
        );
    }

    container.innerHTML = `<div class="swiper-wrapper">${htmlData.join("")}</div>`;
    document.querySelector(".main").appendChild(container);

    new Swiper('.id1', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        autoplay: {
            delay: 3000
        }
    });

    function product(image, discount, price, time, title) {
        return `<div class="swiper-slide">
        <div class="card product d-flex align-items-center flex-column">
            <img src="${image}" alt="Product">
            ${discount > 0 ? `<div class="offer">
                <div class="position-relative">
                    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z" fill="#538CEE"></path></svg>
                    <span>${Math.floor(discount*(100/price))}% OFF</span>
                </div>
            </div>`: ''}
            <div class="card-body w-100">
                <div class="timer bg-light d-flex align-items-center">
                    <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.06152 12C5.55362 8.05369 8.92001 5 12.9996 5C17.4179 5 20.9996 8.58172 20.9996 13C20.9996 17.4183 17.4179 21 12.9996 21H8M13 13V9M11 3H15M3 15H8M5 18H10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
    
                    <span>${Math.floor(time/60)} MINS</span>
                </div>
    
                <h5>${title.length > 35 ? `${title.slice(0,35)}...` : title}</h5>
                <p>1 pack</p>
            </div>
            <div class="card-footer w-100 justify-content-between d-flex align-items-center bg-white border-0">
                <div class="price d-flex flex-column">
                    ${discount > 0 ? `<span>${price-discount}</span>` : ''}
                    <span>${price}</span>
                </div>
                <button class="btn btn-sm btn-outline-success" type="button">Add</button>
            </div>
        </div>
    </div>`
    }
    
    function heading(title, cls = 'd-flex') {
        return `<div class="${cls} justify-content-between align-items center w-100">
        <h2 class="fs-4 fw-bold">${title}</h2>
        <a href="/category/1" class="fs-6 fw-medium text-decoration-none text-success" title="${title}">See All</a>
    </div>`
    }

    // Category
    let section = document.createElement('section');
    htmlData = []

    for(let i=0; i<data.category.length; i++) {
        htmlData.push(
            `<li class="w-100">
            <img src="${data.category[i]}" alt="Category">
        </li>`
        );
    }

    section.innerHTML = `${heading("Shop by category", 'lg-hidden d-none')}
    <ul class="category w-100 h-100" role="list">${htmlData.join("")}</ul>`
    document.querySelector(".main").appendChild(section);


    // Products
    let pro = data.products;
    for(let i = 0; i < pro.length; i++) {
        const section = document.createElement('section');
        const htmlData = [];

        const curr = pro[i].data;
        for(let j = 0; j < curr.length; j++) 
            htmlData.push(product(
                curr[j].image,
                curr[j].discount,
                curr[j].price,
                curr[j].time,
                curr[j].title
            ))
            

        section.innerHTML = `${heading(pro[i].heading)}
        <div class="swiper-container product-swiper swid${i} overflow-hidden">
        <div class="swiper-wrapper">${htmlData.join("")}</div></div>`
            
        document.querySelector('.main').appendChild(section);

        new Swiper(`.swid${i}`, {
            slidesPerView: 'auto',
            spaceBetween: 20
        });
    }
});
