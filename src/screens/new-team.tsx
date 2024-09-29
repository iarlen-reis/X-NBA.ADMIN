import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateTeam } from "@/hooks/teams/use-create-team";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormProps {
  name: string;
  slug: string;
  city: string;
  stadium: string;
  country: string;
  league: string;
  coach: string;
}

export default function NewTeam() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormProps>();

  const { mutate: createTeam, isPending } = useCreateTeam();

  const onSubmit: SubmitHandler<FormProps> = (data: FormProps) => {
    createTeam(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-medium">Crie um novo time</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-3">
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium uppercase">
              Nome
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nome"
              className="w-full rounded border px-4 py-2 outline-none"
              {...register("name", { required: "Campo obrigatório" })}
            />
            {errors.name?.type === "required" && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </fieldset>
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="slug" className="text-sm font-medium uppercase">
              Slug
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="slug"
              placeholder="Slug"
              className="w-full rounded border px-4 py-2 outline-none"
              {...register("slug", { required: "Campo obrigatório" })}
            />
            {errors.slug && (
              <p className="text-xs text-red-500">{errors.slug.message}</p>
            )}
          </fieldset>
        </div>

        <div className="flex items-center gap-3">
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="stadium" className="text-sm font-medium uppercase">
              Estadio
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="stadium"
              placeholder="Estadio"
              className="w-full rounded border px-4 py-2 outline-none"
              {...register("stadium", { required: "Campo obrigatório" })}
            />
            {errors.stadium && (
              <p className="text-xs text-red-500">{errors.stadium.message}</p>
            )}
          </fieldset>
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="city" className="text-sm font-medium uppercase">
              Cidade
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              placeholder="Cidade"
              className="w-full rounded border px-4 py-2 outline-none"
              {...register("city", { required: "Campo obrigatório" })}
            />
            {errors.city && (
              <p className="text-xs text-red-500">{errors.city.message}</p>
            )}
          </fieldset>
        </div>

        <div className="flex items-center gap-3">
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="country" className="text-sm font-medium uppercase">
              País
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="country"
              placeholder="País"
              className="w-full rounded border px-4 py-2 outline-none"
              {...register("country", { required: "Campo obrigatório" })}
            />
            {errors.country && (
              <p className="text-xs text-red-500">{errors.country.message}</p>
            )}
          </fieldset>
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="coach" className="text-sm font-medium uppercase">
              Treinador
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              id="coach"
              placeholder="Treinador"
              className="w-full rounded border px-4 py-2 outline-none"
              {...register("coach", { required: "Campo obrigatório" })}
            />
            {errors.coach && (
              <p className="text-xs text-red-500">{errors.coach.message}</p>
            )}
          </fieldset>
        </div>

        <fieldset className="flex w-full flex-col gap-1">
          <label htmlFor="league" className="text-sm font-medium uppercase">
            Liga
            <span className="ml-1 text-red-500">*</span>
          </label>
          <Select
            onValueChange={(value) =>
              setValue("league", value, { shouldValidate: true })
            }
            {...register("league", { required: "Campo obrigatório" })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Liga" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NBA">NBA</SelectItem>
              <SelectItem value="WNBA">WNBA</SelectItem>
            </SelectContent>
          </Select>
          {errors.league && (
            <p className="text-xs text-red-500">{errors.league.message}</p>
          )}
        </fieldset>
        <div className="flex items-center justify-end gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Criando..." : "Criar time"}
          </Button>
        </div>
      </form>
    </div>
  );
}
