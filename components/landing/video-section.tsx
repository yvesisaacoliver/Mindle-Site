export function VideoSection() {
  return (
    <section className="bg-card flex flex-col min-h-svh lg:min-h-0 lg:block lg:py-24">

      {/* Header — compacto no mobile, normal no desktop */}
      <div className="pt-10 pb-5 px-4 text-center lg:pt-0 lg:pb-12 lg:px-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Conheça a Mindle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A escola que já mudou a vida de milhares de pessoas e pode mudar a sua também. Veja o método e quem já destravou o inglês aqui.
          </p>
        </div>
      </div>

      {/* Vídeo — preenche o restante da tela no mobile, aspect-video no desktop */}
      <div className="flex-1 flex flex-col px-4 pb-6 lg:flex-none lg:px-0 lg:pb-0">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col lg:flex-none lg:aspect-video">
          <div className="relative flex-1 lg:flex-none lg:aspect-video min-h-[200px] rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/8LFpvh_zhOI"
              title="Conheça a Mindle Idiomas"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>

    </section>
  )
}
