const testimonialSwiper = document.querySelector('.testimonialSwiper');
const oldSwiper = document.querySelector('.mySwiper');

if (testimonialSwiper) {
    const params = {
        injectStyles: [`
        .swiper-pagination-bullet {
            background: rgba(0, 200, 83, 0.3) !important;
            opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
            background: #00c853 !important;
        }
        `],
    };
    Object.assign(testimonialSwiper, params);
}

if (oldSwiper) {
    const params = {
        injectStyles: [`
        .swiper-pagination-bullet-active {
            background: #E27F1E !important;
        }
        `],
    };
    Object.assign(oldSwiper, params);
}
