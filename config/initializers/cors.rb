Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "localhost:5173"

    resource "*",
      headers: :any,
      methods: [:get, :post, :patch, :put, :delete, :options]
  end
end