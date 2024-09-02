import { uploadImage } from '@/lib/action'

const CreateForm = () => {
  return (
    <form action={uploadImage}>
        <div className='mb-4 pt-2'>
            <input type="text" name='title' className='py-2 px-4 rounded-sm border border-gray-400 w-full' placeholder='Title...' />
        </div>
        <div className='mb-4 pt-2 '>
            <input type="file" name='image' className='file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full' />
        </div>
        <div className='mb-4 pt-4 '>
           <button className='bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600'>Upload</button>
        </div>
    </form>

  )
}

export default CreateForm



