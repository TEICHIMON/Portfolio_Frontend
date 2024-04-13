import React from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";

const About = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="w-full h-72 relative">
        <Image
          src="https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          layout="fill"
          objectFit="cover"
          alt=""
          className="object-cover filter grayscale"
        />
        <div className="absolute bottom-5 left-5 bg-[#53c28b] p-1.5 text-white space-y-2">
          <h1 className="text-4xl font-bold">
            Digital Storytellers
          </h1>
          <h2 className="text-xl font-medium">
            Handcrafting award winning digital
            experiences
          </h2>
        </div>
      </div>
      <div className="flex space-x-24 mt-12">
        <div className="flex-1 space-y-7.5">
          <h1 className="text-3xl font-semibold">
            Who Are We?
          </h1>
          <p className="text-lg font-light text-justify">
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ducimus quae dolor,
            optio voluptatibus magnam iure esse
            tempora beatae. A suscipit eos. Animi
            quibusdam cum omnis officiis
            voluptatum quo ea eveniet? Lorem ipsum
            dolor sit amet consectetur adipisicing
            elit. Ducimus quae dolor, optio
            voluptatibus magnam iure esse tempora
            beatae, a suscipit eos. Animi
            quibusdam cum omnis officiis
            <br />
            <br />
            voluptatum quo ea eveniet? Lorem ipsum
            dolor sit amet consectetur adipisicing
            elit. Ducimus quae dolor, optio
            voluptatibus magnam iure esse tempora
            beatae, a suscipit eos. Animi
            quibusdam cum omnis officiis
            voluptatum quo ea eveniet?
          </p>
        </div>
        <div className="flex-1 space-y-7.5">
          <h1 className="text-3xl font-semibold">
            What We Do?
          </h1>
          <p className="text-lg font-light">
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ducimus quae dolor,
            optio voluptatibus magnam iure esse
            tempora beatae, a suscipit eos. Animi
            quibusdam cum omnis officiis
            voluptatum quo ea eveniet? Lorem ipsum
            dolor sit amet consectetur adipisicing
            elit. - Creative Illustrations
            <br />
            <br /> - Dynamic Websites
            <br />
            <br /> - Fast and Handy
            <br />
            <br /> - Mobile Apps
          </p>
          <Button url="/contact" text="Contact" />
        </div>
      </div>
    </div>
  );
};

export default About;
