import bgNote from '../../assets/images/common/bg-note.png'

export default function Popup() {
    return (
        <div className="absolute top-0 w-full h-full">
                {/* <div className="popup-header bg-black/[0.8] relative w-full h-[90px]">
                    <span className="text-white uppercase text-[24px] absolute top-[40px] left-[50%] -translate-x-[50%]">Fermer</span>
                </div> */}
                
                <div className="popup-body pt-[80px] h-full" style={{ backgroundImage: `url(${bgNote})`, backgroundSize: 'cover', height: '100vh'}}>
                    <div className="container mx-auto h-full">
                        <div className="flex justify-between border-b border-black">
                            <div className="uppercase">
                                <span className="text-[38px] border-r border-black pr-[10px]">N01</span>
                                <span className="text-[40px] abril pl-[10px]">Entering the war</span>
                            </div>

                            <div className='text-[24px] uppercase flex items-end leading-[48px]'>   
                                <span className='border-r border-black pr-[20px]' onClick={() => console.log('previous')}>Précèdente</span>
                                <span className='pl-[20px]' onClick={() => console.log('next')}>Suivante</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-12" id="text">
                            <div className="col-span-6 mt-[40px] font-light border-r border-black">
                                <div className='pr-[60px] text-[28px]'>
                                    <p>With the outbreak of the Second World War, Luxembourg found itself in a precarious political position. Although the Grand Duchy’s Government was quick to reiterate its traditional policy of strict “disarmed neutrality”, it harboured no illusions about the latter’s viability. Diplomatically isolated and landlocked between Nazi Germany and France, the country risked being overrun by the war-waging powers in the first hours of the conflict – just like in 1914.</p>
                                    <p>This time, however, the Government was poised to act within the narrow frames of neutrality. On 25 August 1939, Luxembourg’s volunteer army of 700 men was deployed to the borders to guard the newly built defensive “Schuster Line” consisting of 62 road barriers. Meanwhile, in January 1940, the Government and grand ducal family secretly decided to leave the country in the event of an invasion. These precautionary measures apart, civilian society was not directly affected by the conflict until May 1940. Yet the threat of war remained a daily presence: air raid shelters were opened, the border populations near Schengen were evacuated, and the canons of the Franco-German frontlines could be heard as far as Luxembourg City.</p>
                                    <p>On 10 May 1940, Nazi Germany violated Luxembourg’s neutrality and invaded the country in its “Blitzkrieg” against France. As the Luxembourg Army surrendered right away, the German invaders rapidly bypassed the “Schuster Line” and overran the country within a few hours.</p>
                                    <p>Félix Streicher (Maastricht University)</p>
                                </div>


                                <div className='grid grid-cols-6' id="references">
                                    <div className="col-span-5">
                                        <div className='ml-[20px] border-b border-black mt-[30px] pb-[10px]'>
                                            <span className='uppercase abril text-[20px]'>Réferences :</span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="col-span-6 ml-[50px] mt-[40px] pb-[50px] h-full overflow-y-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-4">
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt=""/>
                                        </div>
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt=""/>
                                        </div>
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt=""/>
                                        </div>
                                    </div>
                                    <div className="grid gap-4">
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt=""/>
                                        </div>
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt=""/>
                                        </div>
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt=""/>
                                        </div>
                                    </div>
                                    <div className="grid gap-4">
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt=""/>
                                        </div>
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt=""/>
                                        </div>
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt=""/>
                                        </div>
                                    </div>
                                    <div className="grid gap-4">
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt=""/>
                                        </div>
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt=""/>
                                        </div>
                                        <div>
                                            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}