
import JoditEditor from 'jodit-react';
import { memo, useRef} from 'react';
import {useMemo} from 'react'

const TextEditor = ({data, setUpdatedContent}) => {


    const editor = useRef(null);
    const config = useMemo(() => ({
        colorPickerDefaultTab: 'text',
        readonly: false, 
        buttons: [
            'bold',
            'italic',
            'underline', '|',
            'ul',
            'ol', '|',
            'outdent', 'indent', 'align', '|',
            'font',
            'fontsize',
            'brush',
            'paragraph', '|',
            'image',
            'video',
            'link', '|',
            'hr',
            'source', '|',
        ],
    }),[])



    return (
        <>
            <JoditEditor
                ref={editor}
                config={config}
                value={data}
                onChange={newContent => {setUpdatedContent(newContent)}}
                
            />
             
        </>
    )
}

export default memo(TextEditor)