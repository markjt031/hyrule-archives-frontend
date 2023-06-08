import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/heartDisplay.module.css'

export default function HeartsRecovered({numHearts}){
    let hearts=numHearts
    const icons=[]
    while (hearts>0){
        if (hearts>=1){
            icons.push({name: faHeart, className: styles.heart})
            hearts-=1
        }
        else if (hearts===0.5){
            icons.push({name: faHeart, className: styles.half})
            hearts-=0.5
        }
        else if (hearts===0.25){
            icons.push({name: faHeart, className: styles.quarter})
            hearts-=0.25
        }
        else if (hearts===0.75){
            icons.push({name: faHeart, className: styles.threeQuarters})
            hearts-=0.75
        }
    }
    return (
        
        <>
            {icons.length>0 ? icons.map((icon, index)=>{
                const {name, className}=icon
                return <FontAwesomeIcon key={index} icon={name} className={className}/>
            })
            :
            <span>None</span>}
        </>
    )
}