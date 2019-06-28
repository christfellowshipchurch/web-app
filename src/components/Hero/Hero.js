import React from 'react'
import { hero, heroImg, heroContainer } from '../../styles/hero.module.css'
import titleImg from './Christ-Fellowship-Church-Conference-2020.png'
import yearImg from './Christ-Fellowship-Conference-February-2020.png'


const Hero = ({ hide = false }) => hide
    ? null
    : (
        <div className={hero}>

            <div className={heroContainer}>
                <img className={heroImg} src={titleImg} alt="Christ Fellowship Church Conference" />
                <img className={heroImg} src={yearImg} alt="Christ Fellowship Church Conference" />
            </div>

            <div className={heroContainer}>
                <h1 className="font-weight-bold text-uppercase text-light">
                    Feb 12-13 • West Palm Beach, FL
                </h1>
            </div>
        </div>
    )

export default Hero