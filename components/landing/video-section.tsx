'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Conheça a Mindle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A escola que já mudou a vida de milhares de pessoas e pode mudar a sua também. Veja o método e quem já destravou o inglês aqui.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative aspect-video rounded-2xl overflow-hidden bg-foreground/5 shadow-2xl cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            {!isPlaying ? (
              <>
                {/* Video Thumbnail Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="h-8 w-8 md:h-10 md:w-10 ml-1" />
                    </div>
                    <p className="text-foreground font-medium text-lg">Clique para assistir</p>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-16 h-16 border-2 border-primary/20 rounded-lg" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-primary/20 rounded-lg" />
              </>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/8LFpvh_zhOI?autoplay=1"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
