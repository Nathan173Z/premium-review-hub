import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowLeft, Loader2, ChevronDown } from "lucide-react";
import { categories } from "@/data/products";

const categoryOptions = categories.filter((c) => c.id !== "all");

const productSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  price: z.coerce.number().min(0, "Preço deve ser maior ou igual a 0"),
  rating: z.coerce.number().min(0).max(5, "Rating deve estar entre 0 e 5"),
  shortDesc: z.string().min(1, "Descrição curta é obrigatória"),
  fullReview: z.string().min(1, "Review completo é obrigatório"),
  image: z.union([z.literal(""), z.string().url("Informe uma URL válida")]),
  affiliateLink: z.string().url("Link de afiliado inválido").min(1, "Link de afiliado é obrigatório"),
  mlLink: z.union([z.literal(""), z.string().url("Link inválido")]).optional(),
  pros: z.string().optional(),
  cons: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AdminProductFormPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateProduct();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      category: "",
      price: 0,
      rating: 0,
      shortDesc: "",
      fullReview: "",
      image: "",
      affiliateLink: "",
      mlLink: "",
      pros: "",
      cons: "",
    },
  });

  function onSubmit(values: ProductFormValues) {
    const prosArray = values.pros
      ? values.pros.split("\n").filter((s) => s.trim())
      : [];
    const consArray = values.cons
      ? values.cons.split("\n").filter((s) => s.trim())
      : [];

    mutate(
      {
        title: values.title,
        category: values.category,
        price: values.price,
        rating: values.rating,
        shortDesc: values.shortDesc,
        fullReview: values.fullReview,
        image: values.image || undefined,
        affiliateLink: values.affiliateLink,
        mlLink: values.mlLink || undefined,
        pros: prosArray,
        cons: consArray,
      },
      {
        onSuccess: () => {
          toast({
            title: "Produto cadastrado!",
            description: "O produto foi adicionado com sucesso.",
          });
          navigate("/admin");
        },
        onError: (err) => {
          toast({
            title: "Erro ao cadastrar",
            description: err instanceof Error ? err.message : "Tente novamente.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Novo Produto
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: SoundMax Pro X" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço (R$)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="1899" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (0-5)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" min={0} max={5} placeholder="4.8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="shortDesc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição curta</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Uma frase que resume o produto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullReview"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review completo</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Texto completo da review..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Imagem e links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da imagem</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://exemplo.com/imagem.jpg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="affiliateLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link de afiliado (Amazon)</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mlLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Mercado Livre (opcional)</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Collapsible>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <CardTitle>Prós e contras (opcional)</CardTitle>
                      <ChevronDown size={20} className="text-muted-foreground" />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4 pt-0">
                    <FormField
                      control={form.control}
                      name="pros"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prós (um por linha)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="ANC líder de mercado&#10;Bateria de 40h"
                              className="min-h-[80px] font-mono text-sm"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cons"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contras (um por linha)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Preço elevado&#10;Sem resistência à água"
                              className="min-h-[80px] font-mono text-sm"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            <div className="flex gap-4">
              <Button type="submit" disabled={isPending} className="flex-1">
                {isPending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Salvando…
                  </>
                ) : (
                  "Salvar produto"
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link to="/admin">Cancelar</Link>
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default AdminProductFormPage;
