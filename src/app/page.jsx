"use client";
import Navbar from "@/components/navbar/Navbar";
import Carousel from "@/components/Carousel";
import PostList from "@/components/PostList";
import SkeletonCarousel from "@/components/SkeletonCarousel";

import PostApis from "@/_utils/PostApis";
import { useEffect, useState } from "react";

export default function Home() {
  /*
  const Posts = [
    {
      image:
        "https://scontent.fcai20-2.fna.fbcdn.net/v/t39.30808-6/431585392_849740233832419_8808504506083805942_n.jpg?stp=dst-jpg_s960x960&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=pDdRqnZbwxwAb6JibA0&_nc_ht=scontent.fcai20-2.fna&oh=00_AfCLXL_eCwo6TNiy-7tmecAdkOLZ8jLPkK3vr8vH_NHptg&oe=661CE9C5",
      title: "فوز فريق كرة السلة على فريق هليوبوليس",
      artcle:
        "يتقدم السيد رئيس مجلس إدارة نادي جرين هيلز الدكتور : تامر السعيد والسادة أعضاء المجلس الموقر والسيد المدير التنفيذي للنادي 😍🏆 بالتهنئة لابطال فريق كرة السلة تحت 16 سنة اولاد  لفوزهم المستحق على نادى هليوبوليس الشروق في بطولة كأس منطقة القاهرة  بنتيجة 39-22",
    },
    {
      image:
        "https://scontent.fcai20-2.fna.fbcdn.net/v/t39.30808-6/430992037_847661924040250_1672151581627251043_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=GwQ2dflyZA4Ab64MYeG&_nc_ht=scontent.fcai20-2.fna&oh=00_AfBFyoVvEL8AJNyaUfft-g9-R3TfmQ2yc8p_6nr1O4bObg&oe=661CE05B",
      title: "فوز فريق كرة القدم مواليد 2014",
      artcle:
        "يتقدم السيد رئيس مجلس الادارة الدكتور تامر السعيد والسادة أعضاء المجلس الموقر  والسيد المدير التنفيذي للنادي والسيد مدير النشاط الرياضي  بالتهنئة لفريق كرة القدم مواليد 2014 بعد تحقيقهم الفوز  علي  فريق  التربية والتعليم بنتيجه 0/3 لصالح ابطالنا  💪  ضمن منافسات بطولة منطقة القاهرة  لكرة القدم   🇪🇬⚽ ✨💪💚 في مباراة حماسية شهدت تألق جميع اللاعبين ❤️",
    },
    {
      image:
        "https://scontent.fcai20-2.fna.fbcdn.net/v/t39.30808-6/425375780_846921930780916_8143165307591306268_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FLRhqEG-uhQAb4BfYf3&_nc_ht=scontent.fcai20-2.fna&oh=00_AfAepU0IuvbSqkWinI_u-Ea1Mha-Rtm8icYiMg-BXr-H1w&oe=661EAF19",
      title: "فوز جديد لفريق كرة السلة تحت 18 بنات",
      artcle:
        "يتقدم رئيس مجلس إدارة نادي جرين هيلز دكتور : تامر السعيد والسادة أعضاء المجلس والمدير التنفيذي 😍🏆 بالتهنئة لابطال فريق كرة السلة تحت 18 بنات  لفوزهم المستحق  في أولي مبارايات كأس المنطقه على نادى التجمع هايتس بنتيجة 31-25  🏀🏀🥰 الف مبروك لأبطال نادي جرين هيلز 😍💪🏻🥇🏀",
    },
    {
      image:
        "https://scontent.fcai20-2.fna.fbcdn.net/v/t39.30808-6/428703130_846151800857929_4648948885113832802_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2UiQaweUJiUAb6xvyKB&_nc_ht=scontent.fcai20-2.fna&oh=00_AfDhVIH-2TSlK7Mi82dQJ3RplnXJivc8DZEHOuz_gSqYeA&oe=661D01E4",
      title: "فوز فريق كرة السلة تحت 14 بنات على نادى المعادى",
      artcle:
        "يتقدم رئيس مجلس إدارة نادي جرين هيلز دكتور : تامر السعيد والسادة أعضاء المجلس والمدير التنفيذي 😍🏆 بالتهنئة لابطال فريق كرة السلة تحت 14 بنات  لفوزهم المستحق  في أولي مبارايات كأس المنطقه على نادى المعادي  بنتيجة 51-20 🏀🏀🥰 الف مبروك لأبطال نادي جرين هيلز 😍💪🏻🥇🏀",
    },
  ];
  */

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    /*
    PostApis.getPosts().then((res) => {
      setPosts(res.data.data);
    });
    */

    const response = await fetch("/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response?.json();

    if (data?.data) {
      setPosts(data?.data);
    }
  };

  //console.log(posts);

  return (
    <div className=" ">
      {/*{posts[0]?.attributes?.Image?.data[0]?.attributes?.url ? (  */}
      {posts[0]?.Image ? (
        <div>
          <Carousel slides={posts} autoSlide={true} />
          <PostList posts={posts} />
        </div>
      ) : (
        <div>
          <SkeletonCarousel />
        </div>
      )}
    </div>
  );
}
