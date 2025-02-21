import { Upload , Form} from "antd"
import Image from "next/image";
import {FiTrash, FiUpload} from "react-icons/fi";

interface FormImageProps {
    name: string;
    label: string;
    required?: boolean;
    multi?: boolean;
    accept?: string;
}


const FormImage = ({name, label, required, multi, accept = 'image/*'}: FormImageProps) => {
    const Input = ({value, onChange}: any) => {
        return (
            <>
                <Upload.Dragger
                    accept={accept}
                    fileList={value}
                    beforeUpload={() => false}
                    itemRender={(originNode, file, _, {remove}) => {
                        let url = +file.uid < 0 ? file.url : URL.createObjectURL(file?.originFileObj)
                        return (
                            <div className="flex justify-between items-center gap-2 pt-2">
                                <div className="flex items-center gap-2" style={{width: 'calc(100% - 30px)'}}>
                                    <div
                                        className="h-12 aspect-square rounded-sm relative">
                                        <Image
                                            crossOrigin={'anonymous'}
                                            src={url}
                                            fill
                                            style={{
                                                objectFit: 'contain',
                                            }}
                                            alt=""/>
                                    </div>
                                    <p className="text-sm truncate">{file?.name}</p>
                                </div>
                                <div>
                                    <FiTrash
                                        role="button"
                                        className="text-red-500"
                                        onClick={remove}/>
                                </div>
                            </div>
                        )
                    }}
                    onChange={e => {
                        onChange(multi ? e.fileList : e.fileList.length ? [e.fileList[e?.fileList?.length - 1]] : [])
                    }}>
                    <div className="w-full z-0 h-16 flex justify-center gap-2.5 items-center">
                        <FiUpload/>
                        <p className="text-sm font-Inter">
                            Upload a file
                        </p>
                    </div>
                </Upload.Dragger>
            </>
        )
    }


    return (
        <>
            <Form.Item
                name={name}
                label={label}
                className="image-input"
                initialValue={[]}
                rules={[
                    {required: required, message: `Please provide ${label}`}
                ]}>
                <Input/>
            </Form.Item>
        </>
    )
}

export default FormImage;