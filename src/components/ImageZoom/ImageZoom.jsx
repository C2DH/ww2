import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassMinus , faMagnifyingGlassPlus } from '@fortawesome/pro-regular-svg-icons'
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

export default function ImageZoom({ image }) {

    const [stateZoom, setStateZoom] = useState(null)

    function handleTransform(e){
        setStateZoom(e.instance.transformState.scale)
    }


    return (
        <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0} onTransformed={(e) => handleTransform(e)}
>
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                    <TransformComponent>
                        <img src={ image } alt="test" className='w-full max-h-[750px] object-cover'/>
                    </TransformComponent>
                    <Controls zoom={stateZoom}/>
                </>
            )}
        </TransformWrapper>
    )
}


const Controls = ({zoom}) => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
        <div className='flex justify-center pt-[80px]'>
            <div className="flex cursor-pointer">
                <div className='border border-w' style={{ borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px'}} onClick={() => zoomOut() }>
                    <FontAwesomeIcon icon={faMagnifyingGlassMinus} className={classNames('text-[18px] text-white px-[15px] py-[12px]', { "pointer-events-none opacity-20": zoom === null || zoom === 1 })}/>
                </div>
                <div className='uppercase text-[20px] text-white flex items-center border-t border-b border-white px-[12px]' onClick={() => resetTransform()}>
                    <span className={classNames({"pointer-events-none opacity-20": zoom === null || zoom === 1})}>Reset</span>
                </div>
                <div className='border border-w' style={{ borderTopRightRadius: '6px', borderBottomRightRadius: '6px'}} onClick={() => zoomIn()}>
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} className='text-[18px] text-white px-[15px] py-[12px]' />
                </div>
            </div>
        </div>
    )
}