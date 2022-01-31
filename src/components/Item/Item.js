import { StarIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import "./Item.css";
import "swiper/css/bundle";
import { CKEditor } from "ckeditor4-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { db } from "../Firebase/firebase";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Pagination } from "swiper";

function Item() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [item, setItem] = useState([]);
  const [related, setRelated] = useState([]);
  let product = [];
  let slider = [];
  let stars = [];

  const params = useParams();
  const itemId = params.itemId;
  const category = params.category;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const item_local = localStorage.getItem("item");
    if (item_local) {
      setItem(JSON.parse(item_local));
      setRelated(localStorage.getItem(JSON.parse(slider)));

      return;
    }
    db.collection("categories")
      .where("category_name", "==", category)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let products = doc.data().products;
          slider.push(products);
          setRelated(slider);

          products.forEach((e) => {
            if (e.product_id == itemId) {
              product.push(e);
              setItem(product);
              localStorage.setItem("item", JSON.stringify(product));
            }
          });
        });
        localStorage.setItem("slider", JSON.stringify(slider));
      });
  }, []);

  let sliders = related[0]?.map((e, i) => {
    return (
      <SwiperSlide key={i + 2000}>
        <Link to={`/item/${e.product_category}/${e.product_id}`}>
          <div>
            <img
              style={{ width: "300px", height: "200px", objectFit: "contain" }}
              className="object-contain"
              src={e.product_images[0]}
              alt="item"
            />
            <p className="text-[rgb(0,113,133)]">{e?.product_name}</p>
            {Array(Math.floor(e.product_rating / e.product_users_rating))
              .fill()
              .map((_, i) => (
                <StarIcon
                  className="h-3 inline-block text-yellow-500"
                  key={i + 1001}
                />
              ))}
            {`(${e ? e.product_users_rating : ""})`}
            <h5>
              <sup>JOD</sup>
              <strong>{e?.product_price}</strong>
            </h5>
          </div>
        </Link>
      </SwiperSlide>
    );
  });

  for (
    let i = 0;
    i < item[0]?.product_rating / item[0]?.product_users_rating;
    i++
  ) {
    stars.push(
      <span>
        <StarIcon className="h-5 w-5 text-yellow-400 inline-block" />
      </span>
    );
  }

  return (
    <div className="bg-white outline outline-[43px] outline-white">
      <div className="mx-5 my-10 bg-white">
        <div className="md:grid md:gap-10 md:grid-cols-3">
          <div className="flex">
            <div>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                  width: "300px",
                }}
                slidesPerView={1}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
              >
                {item[0]?.product_images.map((e) => {
                  return (
                    <>
                      <SwiperSlide>
                        <img src={e} />
                      </SwiperSlide>
                    </>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className="mt-5 md:mt-0">
            <h1 className="text-[16px] font-semibold">
              {item[0]?.product_name}
            </h1>
            <p className="text-[rgb(0,113,133)]">
              {item[0]?.product_description}
            </p>
            {stars}
            {`(${item[0] ? item[0].product_users_rating : ""})`}
          </div>
          <aside className="border-2 mt-5 md:mt-0 rounded-xl p-5 border-radius-2 bg-white border-neutral-400">
            <p className="text-red-600">
              <sup>JOD</sup> {item[0]?.product_price}
            </p>
            <p className="text-green-600">In Stock.</p>
            <select className="" name="" id="">
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
            </select>
            <br />
            <button className="button w-full rounded-2xl">Add to Cart</button>
            <button className="button w-full rounded-2xl">Buy Now</button>
            <p className="text-sm text-gray-500">Ships from Amazon.com</p>
          </aside>
        </div>
        <hr className="m-10" />
        <h3 className="text-[40px] text-red-600">Top rated from our brands</h3>
        <Swiper
          style={{ marginBottom: "70px" }}
          slidesPerView={4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper cursor-pointer"
        >
          {sliders}
        </Swiper>
        <hr className="m-10" />
        <h3 className="text-[40px] text-red-600 mb-5">Customer reviews</h3>
        <div className="w-[80%] m-auto">
          <div>
            <h3 className="text-xl font-bold">Add your review</h3>
            <CKEditor data="<p>Hello from CKEditor 4!</p>" />
            <button className="button mt-4">Add Review</button>
          </div>
          {item[0]?.product_comments.map((e) => {
            return (
              <div>
                <div className="flex items-center mt-20">
                  <img
                    src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
                    alt=""
                    width={50}
                    height={50}
                  />
                  <p>Haitham Assoli</p>
                </div>
                <StarIcon className="h-5 w-5 text-yellow-400 inline-block" />
                <StarIcon className="h-5 w-5 text-yellow-400 inline-block" />
                <StarIcon className="h-5 w-5 text-yellow-400 inline-block" />
                <StarIcon className="h-5 w-5 text-yellow-400 inline-block" />
                <StarIcon className="h-5 w-5 text-yellow-400 inline-block" />
                <p className="">{e.user_comment}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Item;
