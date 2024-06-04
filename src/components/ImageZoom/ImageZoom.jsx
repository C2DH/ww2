import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassMinus , faMagnifyingGlassPlus } from '@fortawesome/pro-regular-svg-icons'

export default function ImageZoom({ image }) {
    return (
        <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0} onZoom={(e) => console.log(e)} >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                    <TransformComponent>
                        <img src={ image } alt="test" className='w-full max-h-[750px] object-cover'/>
                    </TransformComponent>
                    <Controls />
                </>
            )}
        </TransformWrapper>
    )
}


const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    
    return (
        <div className='flex justify-center pt-[80px]'>
            <div className="flex cursor-pointer">
                <div className='border border-w' style={{ borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px'}} onClick={() => zoomOut() }>
                    <FontAwesomeIcon icon={faMagnifyingGlassMinus} className='text-[18px] text-white px-[15px] py-[12px]'/>
                </div>
                <div className='uppercase text-[20px] text-white flex items-center border-t border-b border-white px-[12px]' onClick={() => resetTransform()}>
                    Reset
                </div>
                <div className='border border-w' style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px'}} onClick={() => zoomIn()}>
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} className='text-[18px] text-white px-[15px] py-[12px]' />
                </div>
            </div>
        </div>
    )
}