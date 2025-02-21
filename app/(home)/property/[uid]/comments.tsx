import { Rate } from "antd"
import Image from "next/image"

const Comments = ({ comments }) => {
    return (
        <>
            { comments.map?.(comment => (
                <div key={comment.id} className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3 '>
                        <div className='w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center'>
                            <Image src={comment?.img} width={500} height={200} alt='icon' className='w-[32px] h-[32px] rounded-full' />
                        </div>
                        <div>
                            <h2 className='text-h4 capitalize'>{comment?.name}</h2>
                            <p className='text-sm'>{comment?.address}</p>
                        </div>
                    </div>
                    <div>
                        <div className='property'>
                            <Rate disabled value={comment?.rating} className='text-black text-[10px]' /> . <span className="text-sb"> {comment?.date}</span> . <span className='text-[#6a6a6a]'> {comment?.time}</span>
                        </div>
                        <h1 className='line-clamp-3 w-[85%] mt-1'> {comment?.comment}</h1>
                    </div>
                </div>
            ))}

        </>
    )
}
export default Comments