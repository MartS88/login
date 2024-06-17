import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "@/components/context";
import classes from './Main.module.scss';
import axios from "axios";
import Layout from "@/components/layout/Layout";
import MyButton from "@/components/ui/button/MyButton";
import {useNavigateHandler} from "@/utils/useCustomNavigate";
import Loader from "@/components/loader/Loader";
import { MdDelete } from "react-icons/md";


export interface Document {
    id: number;
    companySigDate?: string;
    companySignatureName?: string;
    documentName?: string;
    documentStatus?: string;
    documentType?: string;
    employeeNumber?: string;
    employeeSigDate?: string;
    employeeSignatureName?: string;
    createdAt: string;
    updatedAt: string;
}

const Main = () => {
    const navigateHandler = useNavigateHandler();
    const {isAuth, setIsAuth, isLoading, setLoading} = useContext(AuthContext);
    const [constantData, setConstantData] = useState<Document[]>([]);
    const [data, setData] = useState<Document[]>([]);
    const [successMsg,setSuccessMsg] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');


    const logoutHandler = () => {
        setLoading(true);

        setTimeout(() => {
            localStorage.removeItem('token');
            setIsAuth(false);
            setLoading(false);
            navigateHandler('/home');
        }, 1500);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/documents/ru/data/v3/testmethods/docs/userdocs/get');

                if (response.data.success) {
                    setConstantData(response.data.document);
                    setData(response.data.document);
                    setErrorMsg('');


                }
            } catch (error: any) {
                console.log(error);
                setErrorMsg(error.message);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, field: keyof Document) => {
        const {value} = e.target;
        const updatedData = data.map(doc => doc.id === id ? {...doc, [field]: value} : doc);
        setData(updatedData);
    };

    const handleSave = async () => {
        try {
            console.log('data', Array.isArray(data))
            const document = data[0]

            const body = {
                 id:1,
               companySigDate: document.companySigDate,
               companySignatureName: document.companySignatureName,
               documentName: document.documentName,
               documentStatus: document.documentStatus,
               documentType: document.documentType,
               employeeNumber: document.employeeNumber,
               employeeSigDate: document.employeeSigDate,
               employeeSignatureName: document.employeeSignatureName,
               createdAt: document.createdAt,
               updatedAt: document.updatedAt
            }
           const response = await axios.post('http://localhost:5000/documents/ru/data/v3/testmethods/docs/userdocs/create', body);
            setLoading(true);
            setErrorMsg('')
            setSuccessMsg('Data is updated')
            setTimeout(() => {
                setLoading(false);
            },1500)
            console.log('Data saved:', response);
            return response

        } catch (error: any) {
            console.log(error);
            setErrorMsg(error.message);
        }
    };

    const handleClear = () => {
        setData([...constantData])
    }
    const deleteHandler = (id: number, field: keyof Document) => {
        const updatedData = data.map(doc => doc.id === id ? {...doc, [field]: ''} : doc);
        setData(updatedData);
    };


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 16);
    };



    return (
        <Layout>
            {isLoading ?
                <div className={classes.loader}>
                    <Loader width={'70'} height={'70'} color="gray"/>
                </div>
                :
                <div className={classes.main}>
                    <div className={classes.main_block}>
                        <div className={classes.button_block}>
                            <div className={classes.title_block}>
                                <h2 className={classes.title}>User cabinet:</h2>
                                <span className={classes.success}>{successMsg}</span>
                                <span className={classes.error}>{errorMsg}</span>
                            </div>
                            <MyButton onClick={logoutHandler}>Log out</MyButton>
                        </div>

                        <div className={classes.cabinet_block}>
                            {data.length > 0 ? (
                                <div className={classes.data_block}>
                                    {data.map((doc:Document, index:number) => (
                                        <div
                                            className={classes.doc}
                                            key={doc.id}>
                                            <div className={classes.data_item}>
                                                <span className={classes.title}>Company Sig Date:</span>
                                                <span className={classes.about}>{doc.companySigDate}</span>
                                                <div className={classes.input_wrap}>
                                                    <input
                                                        type="datetime-local"
                                                        value={formatDate(doc.companySigDate)}
                                                        onChange={(e) => handleChange(e, doc.id, 'companySigDate')}
                                                    />
                                                    <MdDelete color='red' size='20' onClick={() => deleteHandler(doc.id,'companySigDate')}/>
                                                </div>
                                            </div>

                                            <div className={classes.data_item}>
                                                <span className={classes.title}>Company Signature Name:</span>
                                                <span className={classes.about}>{doc.companySignatureName}</span>
                                                <div className={classes.input_wrap}>
                                                <input
                                                        type="text"
                                                        maxLength={20}
                                                        value={doc.companySignatureName}
                                                        onChange={(e) => handleChange(e, doc.id, 'companySignatureName')}
                                                    />
                                                    <MdDelete color='red' size='20' onClick={() => deleteHandler(doc.id,'companySignatureName')}/>
                                                </div>

                                            </div>
                                            <div className={classes.data_item}>
                                                <span className={classes.title}>Document Name:</span>
                                                <span className={classes.about}>{doc.documentName}</span>
                                                <div className={classes.input_wrap}>
                                                <input
                                                    type="text"
                                                    value={doc.documentName}
                                                    onChange={(e) => handleChange(e, doc.id, 'documentName')}
                                                />
                                                    <MdDelete color='red' size='20' onClick={() => deleteHandler(doc.id,'documentName')}/>
                                                </div>
                                            </div>

                                            <div className={classes.data_item}>
                                                <span className={classes.title}>Document Status:</span>
                                                <span className={classes.about}>{doc.documentStatus}</span>
                                                <div className={classes.input_wrap}>
                                                <input
                                                    type="text"
                                                    value={doc.documentStatus}
                                                    onChange={(e) => handleChange(e, doc.id, 'documentStatus')}
                                                />
                                                    <MdDelete color='red' size='20' onClick={() => deleteHandler(doc.id,'documentStatus')}/>
                                                </div>
                                            </div>

                                            <div className={classes.data_item}>
                                                <span className={classes.title}>Document Type:</span>
                                                <span className={classes.about}>{doc.documentType}</span>
                                                <div className={classes.input_wrap}>
                                                <input
                                                    type="text"
                                                    value={doc.documentType}
                                                    onChange={(e) => handleChange(e, doc.id, 'documentType')}
                                                />
                                                    <MdDelete color='red' size='20' onClick={() => deleteHandler(doc.id,'documentType')}/>
                                                </div>
                                            </div>

                                            <div className={classes.data_item}>
                                                <span className={classes.title}>Employee Number:</span>
                                                <span className={classes.about}>{doc.employeeNumber}</span>
                                                <div className={classes.input_wrap}>
                                                <input
                                                    type="text"
                                                    value={doc.employeeNumber}
                                                    onChange={(e) => handleChange(e, doc.id, 'employeeNumber')}
                                                />
                                                    <MdDelete color='red' size='20' onClick={() => deleteHandler(doc.id,'employeeNumber')} />
                                                </div>
                                            </div>

                                            <div className={classes.data_item}>
                                                <span className={classes.title}>Employee Sig Date:</span>
                                                <span className={classes.about}>{doc.employeeSigDate}</span>
                                                <div className={classes.input_wrap}>
                                                <input
                                                    type="datetime-local"
                                                    value={formatDate(doc.employeeSigDate)}
                                                    onChange={(e) => handleChange(e, doc.id, 'employeeSigDate')}
                                                />
                                                    <MdDelete color='red' size='20' onClick={() => deleteHandler(doc.id,'employeeSigDate')}/>
                                                </div>
                                            </div>

                                            <div className={classes.data_item}>
                                                <span className={classes.title}>Employee Signature Name:</span>
                                                <span className={classes.about}>{doc.employeeSignatureName}</span>
                                                <div className={classes.input_wrap}>
                                                <input
                                                    type="text"
                                                    value={doc.employeeSignatureName}
                                                    onChange={(e) => handleChange(e, doc.id, 'employeeSignatureName')}
                                                />
                                                    <MdDelete color='red' size='20' onClick={() => deleteHandler(doc.id,'employeeSignatureName')} />
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                    <div className={classes.save_button_block}>
                                        <MyButton onClick={handleClear}>Clear</MyButton>
                                        <MyButton onClick={handleSave}>Save</MyButton>
                                    </div>
                                </div>
                            ) : (
                                <p>{errorMsg}</p>
                            )}
                        </div>
                    </div>
                </div>
            }
        </Layout>
    );
};

export default Main;


