import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-8">
          Про нас
        </h1>

        {/* Introduction Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <u><h1 className="text-3xl font-bold text-gray-800 mb-4">Наша місія</h1></u>
          <p className="text-2xl font-bold text-gray-800 mb-4">Місія нашого інтернет-магазину мотоциклів полягає в тому, щоб забезпечити клієнтам найвищу якість обслуговування та надати доступ до широкого асортименту мотоциклів та відповідного обладнання за конкурентоспроможними цінами. Ми прагнемо зробити покупки мотоциклів простими, приємними та доступними для всіх, надаючи швидку доставку та високоякісне обслуговування клієнтів у будь-який час. Наша мета - забезпечити задоволення та впевненість у наших клієнтів у кожному етапі їхньої покупки та використання мотоциклів.</p>
        </section>

        {/* History Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <u><h1 className="text-3xl font-bold text-gray-800 mb-4">
            Наша історія
          </h1>
          </u>

          <div className="mt-4">
            <Image
              src="https://images.unsplash.com/photo-1520986642935-0567c1a1ce2d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Store"
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </div>
        
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Наш інтернет-магазин мотоциклів народився з глибокої пристрасті до мотоциклів і необхідності у зручному способі замовлення запчастин та обладнання. Ми створили цей магазин, щоб не лише полегшити покупки ентузіастам, але і створити спільноту, де кожен зможе знайти все необхідне для своїх мотоциклів. Наша місія - надавати високоякісний сервіс, багатий вибір товарів і незабутні враження від кожної покупки.</h1>
        
        </section>


        {/* Values Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <u><h2 className="text-3xl font-bold text-gray-800 mb-4">
            Наші цінності
          </h2></u>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Наш інтернет-магазин мотоциклів керується кількома ключовими цінностями, що визначають наш підхід до роботи. Ми прагнемо до найвищої якості продуктів і обслуговування для наших клієнтів. Наша команда складається з досвідчених фахівців, готових допомогти вам у виборі та покупці мотоциклів та аксесуарів. Ми пропонуємо широкий асортимент мотоциклів, запчастин і аксесуарів, що задовольнять потреби будь-якого клієнта. Ми підтримуємо чесність і прозорість у всіх наших операціях, надаючи чіткі умови продажу. Наша мета - створити спільноту мотоциклістів, де можна обмінюватися досвідом і порадами. Ми віддані постійному вдосконаленню і пошуку інновацій для покращення нашого сервісу та продуктів, щоб задовольняти потреби наших клієнтів найкращим чином.</h1>
        </section>

        {/* Team Section */}
        <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <u><h2 className="text-3xl font-bold text-gray-800 mb-4">
            Зустрічайте команду
          </h2></u>
          <h1 className="text-2xl font-bold text-gray-800 mb-4"> Зустрічайте нашу команду, де розробником і адміністратором є Павлюк Михайло, студент групи 45.</h1>
        </section>

        {/* Contact Section */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <u><h2 className="text-3xl font-bold text-gray-800 mb-4">
            Зв&apos;яжіться з нами
          </h2></u>
          <h1 className="text-2xl font-bold text-gray-800 mb-4"> Є питання або потреба в допомозі? Напишіть нам на електронну пошту за адресою motoshoppoltava@gmail.com або зателефонуйте за номером +0663116714. Ми раді вам допомогти!</h1>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
