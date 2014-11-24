module PdrClient
  module Initializers
    class Renderers < Rails::Railtie
      initializer "PdfKit" do |app|
        PDFKit.configure do |config|
          config.default_options = {
            page_size: 'Legal',
            print_media_type: false
          }
          config.verbose = false
        end
      end

      initializer "renders" do |app|
        ActionController::Renderers.add :pdf do |filename, options|
          kit = PDFKit.new(render_to_string(options), disable_javascript: true )
          send_data(
             kit.to_pdf,
             filename: "#{filename.to_s}.pdf",
             type: "application/pdf",
             disposition: 'attachment'
          )
        end

        ActionController::Renderers.add :csv do |filename, options|
          send_data render_to_string(options), type: Mime::CSV,
            disposition: "attachment; filename=#{filename.to_s}.csv"
        end
      end
    end
  end
end
