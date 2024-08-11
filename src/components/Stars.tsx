import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
interface RatingProps{
    rating:number;
    bgColor?:string;
    starColor?:string;
    size?:number,
    width?:number;
    height?:number;
    gap?:number;
    starType?:1|2;
    count?:number;
    // editable?:boolean;
    // setStars?:(stars:number)=>void;
}

const FullStar = ({width,height,bgColor}:{width:number,height:number,bgColor:string})=>{
    return (
        <Svg width={width} height={height} viewBox='0 0 50 50' fill={'none'}>
            <Path d='M26.9545 1.27175L33.5002 15.1525L48.1315 17.3793C49.9192 17.6514 50.633 19.9507 49.3394 21.2707L38.7525 32.0733L41.2504 47.3279C41.5555 49.1915 39.6867 50.6126 38.0878 49.7329L24.9994 42.5316L11.9118 49.7329C10.3128 50.6127 8.44397 49.1917 8.74915 47.3279L11.2472 32.0732L0.660565 21.2707C-0.632992 19.9509 0.0807786 17.6514 1.86848 17.3793L16.4997 15.1523L23.0453 1.27165C23.8449 -0.423901 26.155 -0.423901 26.9545 1.27175Z' fill={bgColor}/>
            <Path d='M48.1367 17.3798L33.5454 15.1531L27.0177 1.27276C26.6072 0.399755 25.798 -0.0248402 25 0.00112206V42.5693L25.068 42.5319L38.1205 49.7329C39.7151 50.6127 41.5787 49.1916 41.2745 47.3281L38.7835 32.0736L49.3413 21.2712C50.6313 19.9512 49.9194 17.6519 48.1367 17.3798Z' fill={bgColor}/>
        </Svg>
    )
};

const HalfStar = ({width,height,bgColor,starColor}:{width:number,height:number,bgColor:string,starColor:string})=>{
    return(
        <Svg width={width} height={height} viewBox='0 0 50 50' fill={'none'}>
            <Path d='M26.9545 1.27175L33.5002 15.1525L48.1315 17.3793C49.9192 17.6514 50.633 19.9507 49.3394 21.2707L38.7525 32.0733L41.2504 47.3279C41.5555 49.1915 39.6867 50.6126 38.0878 49.7329L24.9994 42.5316L11.9118 49.7329C10.3128 50.6127 8.44397 49.1917 8.74915 47.3279L11.2472 32.0732L0.660565 21.2707C-0.632992 19.9509 0.0807786 17.6514 1.86848 17.3793L16.4997 15.1523L23.0453 1.27165C23.8449 -0.423901 26.155 -0.423901 26.9545 1.27175Z' fill={starColor}/>
            <Path d='M48.1367 17.3798L33.5454 15.1531L27.0177 1.27276C26.6072 0.399755 25.798 -0.0248402 25 0.00112206V42.5693L25.068 42.5319L38.1205 49.7329C39.7151 50.6127 41.5787 49.1916 41.2745 47.3281L38.7835 32.0736L49.3413 21.2712C50.6313 19.9512 49.9194 17.6519 48.1367 17.3798Z' fill={bgColor}/>
        </Svg>
        
    )
};
const FullStar1 = ({width,height,bgColor}:{width:number,height:number,bgColor:string})=>{
    return (
        <Svg width={width} height={height} viewBox='0 0 50 50' fill={'none'}>
            <Path d='M49.8928 18.838C49.6113 17.9474 48.8254 17.3173 47.9005 17.3173H31.9236L26.9873 1.35877C26.6387 0.550901 25.878 0 24.9966 0C24.1153 0 23.3529 0.550901 23.0111 1.34469L23.006 1.35877L18.0697 17.3173H2.0945C0.938338 17.3173 0 18.3029 0 19.5174C0 20.2461 0.338472 20.8938 0.857909 21.2933L0.864611 21.2968L13.7885 31.1585L8.85221 47.1188C8.78686 47.3229 8.75 47.557 8.75 47.7999C8.75 49.0144 9.68834 50 10.8445 50C11.307 50 11.7342 49.8434 12.0811 49.5758L12.0744 49.5793L25 39.7142L37.9239 49.5793C38.2641 49.8416 38.6914 49.9982 39.1538 49.9982C40.3117 49.9982 41.25 49.0126 41.25 47.7964C41.25 47.5535 41.2131 47.3194 41.1428 47.1012L41.1478 47.117L36.2098 31.1602L49.1371 21.2968C49.6632 20.8902 50 20.2443 50 19.5139C50 19.2727 49.9631 19.0387 49.8944 18.8222L49.8995 18.838H49.8928Z' fill={bgColor}/>
        </Svg>
    )
};

const HalfStar1 = ({width,height,bgColor,starColor}:{width:number,height:number,bgColor:string,starColor:string})=>{
    return(
        <Svg width={width} height={height} viewBox='0 0 50 50' fill={'none'}>
            <Path d='M44.9142 20.0704C44.689 19.3579 44.0603 18.8538 43.3204 18.8538H30.5389L26.5898 6.08702C26.311 5.44072 25.7024 5 24.9973 5C24.2922 5 23.6823 5.44072 23.4088 6.07575L23.4048 6.08702L19.4558 18.8538H6.6756C5.75067 18.8538 5 19.6424 5 20.6139C5 21.1968 5.27078 21.715 5.68633 22.0346L5.69169 22.0375L16.0308 29.9268L12.0818 42.695C12.0295 42.8583 12 43.0456 12 43.2399C12 44.2115 12.7507 45 13.6756 45C14.0456 45 14.3874 44.8747 14.6649 44.6607L14.6595 44.6635L25 36.7713L35.3391 44.6635C35.6113 44.8733 35.9531 44.9986 36.3231 44.9986C37.2493 44.9986 38 44.2101 38 43.2371C38 43.0428 37.9705 42.8555 37.9142 42.6809L37.9182 42.6936L33.9678 29.9282L44.3097 22.0375C44.7306 21.7122 45 21.1954 45 20.6111C45 20.4182 44.9705 20.2309 44.9156 20.0577L44.9196 20.0704H44.9142Z' fill={bgColor}/>
            <Path d='M49.8944 18.9375C49.6129 18.0498 48.8271 17.4217 47.9021 17.4217H31.9253L26.9889 1.51409C26.7074 0.628092 25.9233 0 24.9983 0C24.7671 0 24.5426 0.0403523 24.3348 0.112285L24.3499 0.107021C23.7198 0.335099 23.2373 0.85617 23.0446 1.51058L23.0412 1.52637L23.006 1.51409L18.0697 17.4217H2.0945C0.938338 17.4217 0 18.4042 0 19.6147C0 20.3411 0.338472 20.9867 0.857909 21.385L0.864611 21.3885L13.7885 31.2186L8.85221 47.128C8.78686 47.3315 8.75 47.5648 8.75 47.8069C8.75 49.0175 9.68834 50 10.8445 50C11.307 50 11.7342 49.8439 12.0811 49.5772L12.0744 49.5807L25 39.747L37.9239 49.5807C38.2641 49.8421 38.6914 49.9982 39.1538 49.9982C40.3117 49.9982 41.25 49.0158 41.25 47.8034C41.25 47.5613 41.2131 47.328 41.1428 47.1104L41.1478 47.1262L36.2098 31.2204L49.1371 21.3885C49.6632 20.9832 50 20.3393 50 19.6112C50 19.3709 49.9631 19.1375 49.8944 18.9217L49.8995 18.9375H49.8944ZM32.5134 28.608C31.9873 29.0133 31.6505 29.6589 31.6505 30.387C31.6505 30.6274 31.6873 30.8607 31.756 31.0783L31.751 31.0625L35.1676 42.0646L26.2265 35.2626C25.9015 35.0258 25.4977 34.8854 25.0637 34.8854C25.0402 34.8854 25.0168 34.8854 24.9933 34.8872H24.9966V9.29155L28.4099 20.2954C28.693 21.1814 29.4772 21.8095 30.4021 21.8095H41.4544L32.5134 28.608Z' fill={starColor}/>
        </Svg>
        
    )
};
const Rating = ({ rating, bgColor='#363636', starColor='#FFA800',size=24, gap=5, starType=1, count=5 }:RatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = count - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={[styles.container,{gap:gap}]}>
      {Array(fullStars)
        .fill(null)
        .map((_, index) => (
          (starType===1 ? <FullStar key={`full-${index}`} width={size} height={size} bgColor={starColor} /> : <FullStar1 key={`full-${index}`} width={size} height={size} bgColor={starColor} />)
        ))}
      {hasHalfStar && (starType===1 ? <HalfStar width={size} height={size} bgColor={bgColor} starColor={starColor}/> : <HalfStar1 width={size} height={size} bgColor={bgColor} starColor={starColor}/>)}
      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          (starType===1 ? <FullStar key={`empty-${index}`} width={size} height={size} bgColor={bgColor}/> : <FullStar1 key={`empty-${index}`} width={size} height={size} bgColor={bgColor}/>)
        ))}
        {/* <View style={{flexDirection:'row', zIndex:30,position:'absolute',width:'62%',height:'100%',justifyContent:'center',alignItems:'center'}}>
          {editable && Array.from({length: (count*2)},(_,index) => <TouchableOpacity style={{width:`${100/(count*2)}%`,height:'100%',marginHorizontal:index%2===0 ? 2 : 0}} key={index} onPress={()=>{setStars!=undefined && setStars(index/2)}}></TouchableOpacity>)}
        </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position:'relative'
  },
});

export default Rating;
