import { View, Text } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { reviewCreateHandler, reviewDeleteHandler, reviewEditHandler, reviewGetHandler } from '../../api/reviews';
import ReviewsSec from '../Product/ReviewsSec';
import Loading from '../Dialogs/Loading';
import WriteReview from '../Dialogs/WriteReview';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import InfoDialog from '../Dialogs/InfoDialog';
import { useAppSelector } from '../../hooks';
interface Review {
  reviewid: number;
  userid: number;
  rating: number;
  title:string;
  comment: string;
  username: string;
  createdat: string;
  productstars:number;
}
const Reviews = ({navigation,route}:{navigation:any,route:any}) => {
  const found = useRef<boolean>(true);
    const defaultAccount = useAppSelector((state) => state.userState.defaultAccount)
    const dataVar = useRef<Review[]>([]);
    const [selectedReview, setselectedReview] = useState<null|Review>(null)
    const data = dataVar.current;
    const [stars, setstars] = useState(5);
    const params = { productID: route.params.productID }
    const [dataChecked, setdataChecked] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(false);
    const [dialogType, setdialogType] = useState<null|string>(null);
    const [processLoading, setprocessLoading] = useState(false);
    const [InfoType, setInfoType] = useState<null|string>(null)
    async function dataRequest(){
        const response = await reviewGetHandler({productID:params.productID})
        switch (response.status) {
          case 200:
            dataVar.current = response.data.data;
            setdataChecked(true);
            setloading(false);
            break;
          case 500:
            found.current = false;
            setdataChecked(true);
            setloading(false);
            break;
          }
    }
    async function dataInitializer(){
      !dataChecked && await dataRequest();
    }
    useLayoutEffect(() => {
      dataInitializer();
    }, [dataChecked]);
    async function delReviewPopup(){
      dialogType!==null;
      deleteForm();
    }
    function cancelPopup(){
      setdialogType(null);
  }
  async function deleteForm(){
      setprocessLoading(true);
      if(selectedReview != null){
          const response = await reviewDeleteHandler({reviewID:selectedReview.reviewid,userID:defaultAccount.userID,productID:route.params.productID})
          switch (response.status) {
              case 200:
                  setdialogType(null);
                  setprocessLoading(false);
                  setInfoType('deleted');
                  break;
              case 205:
                  setdialogType(null);
                  setprocessLoading(false);
                  setInfoType('notExists');
                  break;
              case 500:
                  setdialogType(null);
                  setprocessLoading(false);
                  setInfoType('error');
                  break;
          }
      }else{
          setprocessLoading(false);
          setInfoType('error');
      }
  }
  async function toggleInfo(){
      setInfoType(null);
  };
  async function createForm({title,description}:{title:string,description:string}){
    setprocessLoading(true);
    if(stars<1) {
      setInfoType('star');
        return;
    }
    const values = {
        title:title,
        description:description,
    }
    const response = await reviewCreateHandler({userID:defaultAccount.userID,productID:route.params.productID,rating:stars,title:values.title,comment:values.description})
    switch (response.status) {
        case 200:
            setdialogType(null);
            setprocessLoading(false);
            setInfoType('successful');
            break;
        case 205:
            setdialogType(null);
            setprocessLoading(false);
            setInfoType('exists');
            break;
        case 210:
            setdialogType(null);
            setprocessLoading(false);
            setInfoType('noOrder');
            break;
        case 500:
            setdialogType(null);
            setprocessLoading(false);
            setInfoType('error');
            break;
    }
  };
  async function editForm({title,description}:{title:string,description:string}){
    setloading(true);
    const values = {
        title:title,
        description:description,
    }
    if(selectedReview != null){
        const response = await reviewEditHandler({reviewID:selectedReview.reviewid, userID:defaultAccount.userID, productID:route.params.productID, rating:stars, title:values.title, comment:values.description})
        switch (response.status) {
            case 200:
                setdialogType(null);
                setloading(false);
                setInfoType('successful');
                break;
            case 205:
                setdialogType(null);
                setloading(false);
                setInfoType('notExists');
                break;
            case 500:
                setdialogType(null);
                setloading(false);
                setInfoType('error');
                break;
        }
    }else{
        setdialogType(null);
        setloading(false);
        setInfoType('error');
    }
    
  }
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
      {dialogType==='writeReview' && <WriteReview selectedReview={selectedReview} setstars={setstars} stars={stars} title='Write a Review' message='Share your Thoughts' btn1='Cancel' btn2='Submit' btn1Func={cancelPopup} btn2Func={createForm}/>}
      {dialogType==='editReview' && <WriteReview isEdit={true} selectedReview={selectedReview} setstars={setstars} stars={stars} title='Edit your Review' message='Share your Thoughts' btn1='Cancel' btn2='Submit' btn1Func={cancelPopup} btn2Func={editForm}/>}
      {(loading||processLoading) && <Loading/>}
      {dialogType==='deletePopup' && <ConfirmationDialog title='Confirmation' message='Are you sure, you want to delete the Review?' btn1='Cancel' btn2='Delete' btn1Func={cancelPopup} btn2Func={delReviewPopup}/>}
      {InfoType==='error' && <InfoDialog title='Server Error' message='We are currently facing downtime, please try again lator.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='notExists' && <InfoDialog title='Does not exist' message='The selected review cannot be deleted as it does not exist.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='deleted' && <InfoDialog title='Successful' message='The review has been succesfully deleted, you may see update in few minutes.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='exists' && <InfoDialog title='Already exists' message='You have already reviewed this product, please edit or delete previous review before submitting new one.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='noOrder' && <InfoDialog title='Purchase product' message='Please purchase product before reviewing.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='successful' && <InfoDialog title='Successful' message='Succesfully Completed the action, you may see update in few minutes.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='star' && <InfoDialog title='Rating' message='Rating below 1 star is not allowed' btn='Close' btnFunc={toggleInfo}/>}
      <ReviewsSec data={data} productID={params.productID} reviewCount={data.length} setselectedReview={setselectedReview} setdialogType={setdialogType} allReview={true}/>
    </View>
  )
}

export default Reviews