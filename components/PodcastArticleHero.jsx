import classNames from "classnames"
import gsap from "gsap"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import ArticleDateLine from "./ArticleDateLine"
import ArticleNumberCounter from "./ArticleNumberCounter"
import ArticleTitle from "./ArticleTitle"

export default function PodcastArticleHero({
    title,
    subtitle,
    publishedAt,
    theme,
    podcast,
}) {
    const contentRef = useRef()
    const playerRef = useRef()
    const [hasShown, setHasShown] = useState()
    const episode = useMemo(() => {
        try {
            const parsed = JSON.parse(podcast.episode)
            return parsed
        } catch (e) {
            console.log(e)
            return null
        }
    }, [podcast])
    const onAnimationComplete = useCallback(() => {
        gsap.to(contentRef.current, {
            y: 0,
            ease: "power3.inOut",
            duration: 1,
        })
        setHasShown(true)
        document.body.style.overflow = "auto"
    }, [])

    useEffect(() => {
        if (contentRef.current && !hasShown) {
            document.body.style.overflow = "hidden"
            gsap.set(contentRef.current, {
                y: window.innerHeight * 0.8,
            })
        }
    }, [hasShown])

    return (
        <div className="theme-green-light">
            <div
                className="main-area bg-current-theme pt-32 lg:pt-36 pb-16 relative flex items-center justify-center overflow-hidden"
                style={{ minHeight: "100vh" }}>
                <ArticleNumberCounter
                    target={new Date(publishedAt).getDate()}
                    onComplete={onAnimationComplete}
                />
                <div
                    className="mx-auto text-center container relative z-10"
                    ref={contentRef}>
                    <ArticleDateLine
                        type={"Spiller til Spiller"}
                        theme={theme}
                        publishedAt={publishedAt}
                    />
                    <ArticleTitle>
                        {podcast?.number || "00"}: {title}
                    </ArticleTitle>
                    {episode && (
                        <div className="flex items-center justify-center mt-8">
                            <PlayButton
                                playerRef={playerRef}
                                className=" w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] border-2"
                                podcast={podcast}
                            />
                        </div>
                    )}
                    <h2 className=" text-lg font-serif max-w-[65ch] mx-auto mt-11">
                        {subtitle}
                    </h2>
                    <p className="font-serif mt-10">
                        <span className="opacity-50">Lyt og abonnér:</span>{" "}
                        <PodcastLinks {...podcast} />
                    </p>
                </div>
            </div>
            {episode && (
                <InlinePodcastPlayer playerRef={playerRef} episode={episode} />
            )}
            {/* <div className="author-row text-center font-serif opacity-50">
                <h4 className="mt-16">af {author?.name}</h4>
            </div> */}
        </div>
    )
}

function PodcastLinks({ spotify, apple, soundcloud }) {
    const links = [
        spotify ? (
            <a
                className="underline hover:opacity-50"
                href={spotify}
                target="_blank"
                key="spotify">
                Spotify
            </a>
        ) : (
            false
        ),
        apple ? (
            <a
                className="underline hover:opacity-50"
                href={apple}
                target="_blank"
                key="apple">
                Apple Podcast
            </a>
        ) : (
            false
        ),
        soundcloud ? (
            <a
                className="underline hover:opacity-50"
                href={soundcloud}
                target="_blank"
                key="soundcloud">
                Soundcloud
            </a>
        ) : (
            false
        ),
    ].filter(Boolean)

    return links.reduce((links, current, index) => {
        if (index == 0) return [current]

        return [...links, ", ", current]
    }, [])
}

function PlayButton({ className, playerRef }) {
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        if (playerRef.current) {
            function onPlay() {
                setPlaying(true)
            }
            function onPause() {
                setPlaying(false)
            }
            function onEnded() {
                setPlaying(false)
            }

            playerRef.current.addEventListener("play", onPlay)
            playerRef.current.addEventListener("pause", onPause)
            playerRef.current.addEventListener("ended", onEnded)

            return () => {
                playerRef.current?.removeEventListener("play", onPlay)
                playerRef.current?.removeEventListener("pause", onPause)
                playerRef.current?.removeEventListener("ended", onEnded)
            }
        }
    }, [])

    return (
        <div
            className={classNames(
                "button rounded-full flex items-center justify-center border border-black-full group cursor-pointer",
                className,
            )}
            onClick={() => {
                if (playerRef.current.paused) {
                    playerRef.current.play()
                } else {
                    playerRef.current.pause()
                }
            }}>
            {playing ? (
                <img
                    src="/assets/icons/pause.svg"
                    alt="Pause button"
                    className="group-hover:scale-110 transition-all w-[35%]"
                />
            ) : (
                <img
                    src="/assets/icons/play.svg"
                    alt="Play button"
                    className="translate-x-[18%] group-hover:scale-110 transition-all w-[35%]"
                />
            )}
        </div>
    )
}

function InlinePodcastPlayer({ episode, playerRef }) {
    const timelineRef = useRef()
    const timecodeRef = useRef()
    const [muted, setMuted] = useState()
    const onTimeUpdate = useCallback(() => {
        timelineRef.current.style.width = `${
            (playerRef.current.currentTime / playerRef.current.duration) * 100
        }%`

        const currentSeconds = Math.floor(playerRef.current.currentTime % 60)
        const currentMinutes = Math.floor(playerRef.current.currentTime / 60)
        timecodeRef.current.innerText = `${
            currentMinutes > 9 ? currentMinutes : "0" + currentMinutes
        }:${currentSeconds > 9 ? currentSeconds : "0" + currentSeconds}`
    })
    const onEnded = useCallback(() => {
        playerRef.current.currentTime = 0
    }, [])

    const onSeekRequest = useCallback((event) => {
        const { left } = timelineRef.current.getBoundingClientRect()
        const distanceInBar = event.clientX - left
        const distanceFraction =
            distanceInBar / timelineRef.current.parentElement.offsetWidth
        playerRef.current.currentTime =
            playerRef.current.duration * distanceFraction
    }, [])

    return (
        <div className="w-full bg-white px-6 lg:px-8 xl:px-16 py-4 lg:py-6 flex items-center">
            <div className="controls">
                <PlayButton className="w-14 h-14" playerRef={playerRef} />
            </div>
            <div className="timeline-container flex-grow w-full flex items-center text-xs px-6">
                <div className="current-time w-8" ref={timecodeRef}>
                    00:00
                </div>
                <div
                    className="timeline w-full flex items-center h-8 cursor-pointer pl-3"
                    onClick={onSeekRequest}>
                    <div className="h-0.5 bg-black-full bg-opacity-10 w-full">
                        <audio
                            src={episode.url}
                            ref={playerRef}
                            onTimeUpdate={onTimeUpdate}
                            onEnded={onEnded}
                            muted={muted}
                        />
                        <div
                            ref={timelineRef}
                            className="progress w-0 bg-black-full h-full transition-all ease-out"></div>
                    </div>
                </div>
                <div className="remaining-time"></div>
            </div>
            <div className="actions">
                <div
                    className="mute border border-black-full rounded-full flex items-center justify-center h-8 w-8 group cursor-pointer"
                    onClick={() => setMuted((m) => !m)}>
                    <img
                        src="/assets/icons/sound.svg"
                        className={classNames(
                            "group-hover:scale-110 transition-all",
                            {
                                "opacity-20": muted,
                            },
                        )}
                        alt="Sound"
                    />
                </div>
                {/* <div className="share"></div> */}
            </div>
        </div>
    )
}
