import { Checkbox, Form } from "antd"


export const MultiselectDays = ({ name, options }) => {
    const Input = ({ value, onChange }: any) => {
        return (
            <div className="flex flex-col justify-between gap-4 mt-4">
                {options.map((val, index) => (
                    <div key={index}
                        role="button"
                        onClick={() => {
                            if (value?.includes(val.name)) {
                                onChange(value.filter((v) => v !== val.name))
                            } else {
                                onChange([...value, val.name])
                            }
                        }}
                        className="flex gap-4 px-4 py-[10px] rounded-[2px] cursor-pointer border bg-secondary hover:border-primary hover:bg-primary-50 border-secondary">
                        <div className="flex justify-between w-full  gap-x-2 items-center">
                            <p className='text-p1 text-main capitalize'>{val.name}</p>
                            <div className="flex-1" />
                            <div className="gap-x-6">
                                <Checkbox
                                    checked={value?.includes(val.name)}
                                    className='text-secondaryText text-p3' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Form.Item name={name} initialValue={[]}>
            <Input />
        </Form.Item>
    )
}
