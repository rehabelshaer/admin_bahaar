import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardWraper from "../../components/new/CardWraper";
import PageWraper from "../../components/new/PageWraper";
import Loader from "../../components/new/loader";
import enstance from "../../library/helpers/axios";
import { Descriptions, Divider, Table, Tag,Image } from "antd";
import config from "./config";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { generateCols } from "../MainIndex/generateCol";

// import { useSelector } from 'react-redux';

const UserDetails = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  // const isLoggedIn = useSelector((state) => state.Auth.idToken);

  ////////////////////////////////

  useEffect(() => {
    setLoading(true);
    enstance[config.api.show[0].method](`${config.api.show[1]}${params.id}`, {
      headers: {},
    }).then((res) => {
      setLoading(false);
      setUser(res.data.data);
    });
  }, []);

  dispatch({
    type: "SET",
    payload: [
      {
        key: config.routes.indexKey,
        to: config.routes.index,
        title: config.routes.indexTitle,
      },
      {
        key: config.titles.show,
        to: `${config.routes.show}${params.id}`,
        title: config.titles.show,
      },
    ],
  });

  return (
    <div className="user_details">
      <PageWraper>
        <div>
          <div style={{ marginTop: "1rem" }}>
            <CardWraper>
              {loading ? (
                <div className="text-center">
                  <Loader />
                </div>
              ) : (
                <>
                  <Descriptions bordered>
                  <Descriptions.Item span={2} label={"profile_image".translate()}>
                      <Image src={user?.profile_image}  width={100} height={100}/>
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label={"name".translate()}>
                      {user?.name}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label={"email".translate()}>
                      {user?.email}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label={"phone".translate()}>
                        {user?.country_code}  {user?.phone}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label={"user_type".translate()}>
                      {user?.user_type==1?"Client":"Owner"}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label={"account_type".translate()}>
                      {user?.account_type==1?"Individual":"Company"}
                    </Descriptions.Item>

                    {/* <Descriptions.Item span={2} label={"created_at".translate()}>
                      {user?.created_at}
                    </Descriptions.Item>            */}
                    <Descriptions.Item span={2} label={"is_block".translate()}>
                      {user?.is_block?'Blocked':'Not Blocked'}
                    </Descriptions.Item>               
                    <Descriptions.Item span={2} label={"num_of_vehicles".translate()}>
                      {user?.num_of_vehicles}
                    </Descriptions.Item>  
        
                    <Descriptions.Item span={2} label={"commercial_register_image".translate()}>
                      <Image src={user?.commercial_register_image}  width={100} height={100}/>
                    </Descriptions.Item> 
                    <Descriptions.Item span={2} label={"commercial_register".translate()}>
                      {user?.commercial_register}
                    </Descriptions.Item>  

                    <Descriptions.Item span={2} label={"national_id_image".translate()}>
                      <Image src={user?.national_id_image}  width={100} height={100}/>
                    </Descriptions.Item> 
                    <Descriptions.Item span={2} label={"national_id".translate()}>
                      {user?.national_id}
                    </Descriptions.Item>  
     
          
                    <Descriptions.Item span={2} label={"iban".translate()}>
                      {user?.iban}
                    </Descriptions.Item>  
                  </Descriptions>
              
                </>
              )}
            </CardWraper>
          </div>
        </div>
      </PageWraper>
    </div>
  );
};

export default UserDetails;


// avg_rate: 0
// extra_info_ar: ""
// extra_info_en: ""



// is_admin_accept: 2
// is_email_verified: 0
// is_phone_verified: 1
// active_notification: 1
