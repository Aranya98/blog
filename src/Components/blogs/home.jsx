import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./home.module.css";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";

const Home = () => {
  const { data } = useSelector((state) => state.blog);
  const navigate = useNavigate();

  const DisplayData = (val) => {
    let newdata = new Date(val);

    return `${newdata.getDate()}/${
      newdata.getMonth() + 1
    }/${newdata.getFullYear()}`;
  };
  return (
    <div className={styles.main}>
      <div className={styles.noblogs}>
        {data.length === 0 && (
          <div className="d-flex flex-column align-items-center">
            <FaPlus
              className={styles.noblog_icon}
              onClick={() => {
                if (sessionStorage.getItem("username")) {
                  navigate("/createblog");
                } else {
                  navigate("/login");
                }
              }}
            />

            <label className={styles.noblog_label}>Create New Blog</label>
          </div>
        )}
      </div>

      {data.length > 0 && (
        <div className={styles.blogs}>
          <div className={styles.blogmain}>
            <h3>All Blogs</h3>

            <button
              className={styles.createbtn}
              onClick={() => {
                if (sessionStorage.getItem("username")) {
                  navigate("/createblog");
                } else {
                  navigate("/login");
                }
              }}
            >
              Create New
            </button>
          </div>

          <div>
            {data.map((item, index) => {
              return (
                <div className="mt-3">
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/blog/${item.blogid}`)}
                  >
                    <h4>
                      {item?.title}{" "}
                      {sessionStorage.getItem("username") ===
                        item.createdby && (
                        <RiEdit2Fill
                          style={{ width: "50px" }}
                          onClick={(e) =>{
                            e.stopPropagation()
                            navigate(`/createblog/?edit=${item.blogid}`)
                          }
                         
                          }
                        />
                      )}
                    </h4>
                    <label>Created at :{DisplayData(item?.createdat)}</label>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
